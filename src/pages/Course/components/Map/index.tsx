import { FormInstance } from 'antd'
import { useEffect, useState } from 'react'
import { Map, Marker, NavigationControl } from 'react-bmapgl'

interface IProps {
  form: FormInstance
}

const MapComponent = ({ form }: IProps) => {
  const [point, setPoint] = useState({ lng: 0, lat: 0 })
  const [address, setAddress] = useState('')

  useEffect(() => {
    setPoint({
      lng: form.getFieldValue('longitude'),
      lat: form.getFieldValue('latitude'),
    })
  }, [])

  const handleMapClick = event => {
    const { lng, lat } = event.latlng
    setPoint({ lng, lat })
    getAddress(lng, lat)
    form.setFieldsValue({
      address: address,
      longitude: lng,
      latitude: lat,
    })
  }

  const getAddress = (lng, lat) => {
    const geoc = new BMapGL.Geocoder()
    const point = new BMapGL.Point(lng, lat)
    geoc.getLocation(point, result => {
      if (result) {
        setAddress(result.address)
        form.setFieldsValue({
          address: result.address,
          longitude: lng,
          latitude: lat,
        })
      }
    })
  }

  return (
    <div style={{ height: '200px' }}>
      <Map
        center={point}
        zoom="15"
        style={{ height: '100%' }}
        onClick={handleMapClick}
        enableScrollWheelZoom
        enableKeyboard={false} // 禁用键盘控制
      >
        <Marker position={point} />
        <NavigationControl />
      </Map>
    </div>
  )
}

export default MapComponent
