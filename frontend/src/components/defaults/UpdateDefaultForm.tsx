import { Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { IDefault } from '../../types/default';

interface IUpdateDefaultFormProps {
  decimalInput?: boolean;
  default: IDefault;
  isUpdated?: boolean;
  setAllDefaults: Dispatch<SetStateAction<IDefault[]>>;
  setUpdatedDefaults: Dispatch<SetStateAction<IDefault[]>>;
}

export const UpdateDefaultForm = (
  {
    decimalInput = false,
    default: _default,
    isUpdated = false,
    setAllDefaults,
    setUpdatedDefaults,
  }: IUpdateDefaultFormProps
) => {
  return (
    <Form>
      <Form.Group className="mb-4">
        <Form.Label>{_default.defaultFor}</Form.Label>
        <Form.Control
          style={isUpdated ? { background: 'lightgreen' } : {}}
          type="text"
          value={_default.value}
          onChange={({ target: { value } }) => {
            (!decimalInput || value.match(/^\d*\.?\d*$/))
            && [ setAllDefaults, setUpdatedDefaults ].forEach((fn) => {
              fn(
                (old) => [
                  ...old.filter(({ defaultFor }) => defaultFor !== _default.defaultFor),
                  { ..._default, value },
                ]
              );
            });
          }}
        />
      </Form.Group>
    </Form>
  );
};
