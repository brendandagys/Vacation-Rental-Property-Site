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
  const [ allDefaults, setAllDefaults ] = useState<IDefault[]>([]);
  const [ defaultsToUpdate, setDefaultsToUpdate ] = useState<IDefault[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const allDefaults = await getAllDefaults();
      setAllDefaults(allDefaults);
    };

    void fetch();
  }, []);

  const onUpdateDefaults = () => {
    void putDefaults(defaultsToUpdate.map(({ defaultFor, value }) => ({
      defaultFor,
      value,
    })));
  };

  return (
    <Container fluid="md">
      <Row>
        {
          allDefaults
            .sort(sortDefaults)
            .map((_default) => {
              return (
                <Col key={_default.defaultFor} xs={6} sm={4} md={3} lg={2} className="mt-3">
                  <Card className="p-3" style={{ background: '#f3f3f3' }}>
                    <UpdateDefaultForm
                      key={_default.defaultFor}
                      decimalInput={Object.values(EDefaultFor).includes(_default.defaultFor)}
                      default={_default}
                      setAllDefaults={setAllDefaults}
                      setDefaultsToUpdate={setDefaultsToUpdate}
                    />
                  </Card>
                </Col>
              );
            })
        }
      </Row>
      <Button className="mt-4" onClick={onUpdateDefaults}>Save Defaults</Button>
    </Container>
  );
};
