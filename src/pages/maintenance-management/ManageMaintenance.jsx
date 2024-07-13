import { useParams } from "react-router-dom"

export default function ManageMaintenance() {
  let { assetId } = useParams()
  return (
    <div>{`Activo ${assetId}`}</div>
  )
}