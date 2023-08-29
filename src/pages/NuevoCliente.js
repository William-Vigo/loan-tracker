import { Controller, useForm } from "react-hook-form";
import Select from 'react-select';
import "./NuevoCliente.css"
import {v4 as uuidv4} from "uuid"
import { useState } from "react";

export function NewClient() {
  const { control, register, handleSubmit, reset, formState: {errors}} = useForm();
  const [selected, setSelected] = useState(null)
  const HandleSelected = selectedOption => {
    setSelected(selectedOption);
  }
  const documentTypes = [
    { value: 'dni', label: 'DNI' },
    { value: 'passaporte', label: 'Passport' },
    { value: 'licensia', label: 'Licence' }
  ]

  const onSubmit = (data) => {
    // todo:
    // highlight what fields need to be filled if missing
    // style drop down better
    // check if client already exists
    // add notification that client has been successfully uploaded
    // fix cancel button to reset dropdown too
    console.log(data)
    const sql = "INSERT INTO Clients (_id, fullName, documentType, documentID, address, email, cellNumber) VALUES (?,?, ?, ?, ?, ?, ?)";

    
    window.electron.send('insert-new-client', {
      query: sql,
      values: [
        uuidv4(),
        data.fullName,
        data.documentType.value,
        data.documentID,
        data.address,
        data.email,
        data.cellNumber,
      ]
    });

    reset();
  }
  

  const customStyles = {
      control: provided => ({
        ...provided,
        fontSize: 14, // Customize font size for options
      }),
      option: (provided, {isSelected}) => ({
        ...provided,
        backgroundColor: isSelected ? '#f0f0f0' : 'white', // Customize option background color
        color: isSelected ? '#333' : '#666', // Customize option text color
        fontStyle: 'normal',
        fontSize: 14, // Customize font size for options
      }),
      singleValue: (provided) => ({
        ...provided,
        fontStyle: selected ? 'normal' : 'italic',
      }),
    };
  return (
    <div className="page-container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group"><label>Nombre completo</label><input placeholder="John" {...register('fullName', {required: true})}/></div>
          <div className="form-group"><label>Tipo de documento</label>
          <Controller
            name="documentType"
            control={control}
            rules={{required: true}}
            render={({field}) => (
              <Select 
                {...field}
                className="drop-down"
                options={documentTypes}
                onChange={(val) => {
                  HandleSelected(val)
                  field.onChange(val)
                }}
                value={selected}
                isClearable={true}
                isSearchable={true}
                placeholder="Tipo de documento"
                styles={customStyles}
              />
            )}
          />
          </div>
          <div className="form-group"><label>Numero de documento</label><input placeholder="123456789"{...register('documentID', {required: true})}/></div>
          <div className="form-group"><label>Dirreccion</label><input placeholder="1 main st Orange PA, 07928"{...register('address',{required: true})}/></div>
          <div className="form-group"><label>Correo</label><input placeholder="john@gmail.com"{...register('email',{required: true})}/></div>
          <div className="form-group"><label>Numero de telefono</label><input placeholder="9735551234"{...register('cellNumber',{required: true})}/></div>
          <div className="button-group">
            <button type="reset" style={{background: '#d85953'}}>Cancelar</button>
            <button type="submit" style={{background: '#0983f5'}}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewClient