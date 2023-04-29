import { useEffect, useState } from 'react';
import { getAllDefaults, putDefaults } from '../../api/default';
import { EDefaultFor, IDefault } from '../../types/default';
import { UpdateDefaultForm } from './UpdateDefaultForm';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const monthPriceOrder = Object.keys(EDefaultFor);

const sortDefaults = (a: IDefault, b: IDefault) => {
  const aToCompare = (
    a.defaultFor.includes('Price') ? monthPriceOrder.indexOf(`${a.defaultFor}`) : a.defaultFor
  );

  const bToCompare = (
    b.defaultFor.includes('Price') ? monthPriceOrder.indexOf(`${b.defaultFor}`) : b.defaultFor
  );

  return aToCompare < bToCompare ? -1 : 1;
};

export const ManageDefaultsContainer = () => {
  const [ allDefaults, setAllDefaults ] = useState<IDefault[]>([]); // Needed for controlled inputs
  const [ originalDefaults, setOriginalDefaults ] = useState<IDefault[]>([]); // Calculate field changes
  const [ updatedDefaults, setUpdatedDefaults ] = useState<IDefault[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const allDefaults = await getAllDefaults();
      setAllDefaults(allDefaults);
      setOriginalDefaults(allDefaults);
    };

    void fetch();
  }, []);

  const onUpdateDefaults = () => {
    const defaultsToUpdate = (
      updatedDefaults
        .filter((d) => {
          const original = originalDefaults.find(({ defaultFor }) => defaultFor === d.defaultFor) ?? null;
          return original && original.value !== d.value;
        })
        .map(({ defaultFor, value }) => ({
          defaultFor,
          value,
        }))
    );
    defaultsToUpdate.length && void putDefaults(defaultsToUpdate    );

    setUpdatedDefaults([]);
  };

  return (
    <Container fluid="md">
      <Row>
        {
          allDefaults
            .sort(sortDefaults)
            .map((_default) => {
              const changedDefault = (
                updatedDefaults.find((d) => d.defaultFor === _default.defaultFor) ?? null
              );

              return (
                <Col key={_default.defaultFor} xs={6} sm={4} md={3} lg={2} className="mt-3">
                  <Card className="p-3" style={{ background: '#f3f3f3' }}>
                    <UpdateDefaultForm
                      key={_default.defaultFor}
                      decimalInput={Object.values(EDefaultFor).includes(_default.defaultFor)}
                      default={_default}
                      isUpdated={
                        !!(
                          changedDefault
                          && (
                            changedDefault.value
                            !== originalDefaults.find((d) => d.defaultFor === _default.defaultFor)?.value
                          )
                        )
                      }
                      setAllDefaults={setAllDefaults}
                      setUpdatedDefaults={setUpdatedDefaults}
                    />
                  </Card>
                </Col>
              );
            })
        }
      </Row>
      {allDefaults.length > 0 && <Button className="mt-4" onClick={onUpdateDefaults}>Save Defaults</Button>}
    </Container>
  );
};
