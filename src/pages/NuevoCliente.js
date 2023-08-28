import { useForm } from "react-hook-form";
import "./NuevoCliente.css"
import {v4 as uuidv4} from "uuid"
export function NewClient() {
  const { register, handleSubmit, formState : {errors}, reset} = useForm();

  const onSubmit = (data) => {
    console.log(data)
     const sql = "INSERT INTO Clients (_id, fullName, documentType, documentID, address, email, cellNumber) VALUES (?,?, ?, ?, ?, ?, ?)";

    window.electron.send('insert-new-client', {
      query: sql,
      values: [
        uuidv4(),
        data.fullName,
        data.documentType,
        data.documentID,
        data.address,
        data.email,
        data.cellNumber,
      ]
    });
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group"><label>Nombre completo</label><input {...register('fullName')}/></div>
          <div className="form-group"><label>Tipo de documento</label><input {...register('documentType')}/></div>
          <div className="form-group"><label>Numero de documento</label><input {...register('documentID')}/></div>
          <div className="form-group"><label>Dirreccion</label><input {...register('address')}/></div>
          <div className="form-group"><label>Correo</label><input {...register('email')}/></div>
          <div className="form-group"><label>Numero de telefono</label><input {...register('cellNumber')}/></div>
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