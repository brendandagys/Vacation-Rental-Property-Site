import { Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { IDefault } from '../../types/default';

interface IUpdateDefaultFormProps {
  decimalInput?: boolean;
  default: IDefault;
  setAllDefaults: Dispatch<SetStateAction<IDefault[]>>;
  setDefaultsToUpdate: Dispatch<SetStateAction<IDefault[]>>;
}

export const UpdateDefaultForm = (
  { decimalInput = false, default: _default, setAllDefaults, setDefaultsToUpdate }: IUpdateDefaultFormProps
) => {
  return (
    <Form>
      <Form.Group className="mb-4">
        <Form.Label>{_default.defaultFor}</Form.Label>
        <Form.Control
          type="text"
          value={_default.value}
          onChange={({ target: { value } }) => {
            (!decimalInput || value.match(/^\d*\.?\d*$/))
            && [ setAllDefaults, setDefaultsToUpdate ].forEach((fn) => {
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
