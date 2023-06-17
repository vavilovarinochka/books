import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { postData, uploadImage } from '../utils/network';


export default function AdminEditProductsdModal(props) {
  const [title, setTitle] = useState(props.productData.title);
  const [author, setAuthor] = useState(props.productData.author);
  const [amount, setAmount] = useState(props.productData.amount);
  const [price, setPrice] = useState(props.productData.price);
  const [photoId, setPhotoId] = useState(props.productData.photo_id)
  const [file, setFile] = useState()


  const editProduct = async (e) => {
    e.preventDefault()
    if(file) {
        const { success, message, id: photo_id } = await uploadImage(file)
        setPhotoId(photo_id)
    }
    const response = await postData(`/products/update/${props.productData.id}`, { title, author, amount, price, photo_id: photoId  });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR");
      return;
    }
    setTitle()
    setAuthor()
    setAmount()
    setPrice()
    props.getProductList()
    props.onHide()
    return alert(response.message)
  };
  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
        >Изменение данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form
            onSubmit={ editProduct}
          >
            <Form.Group className="reg-fg">
              <Form.Label>Название книги</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите название книги"
                defaultValue={props.productData.title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Автор книги</Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Введите автора"
                defaultValue={props.productData.author}
                onChange={(event) => setAuthor(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Количество книг на складе</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                placeholder="Введите оставшееся количество книг"
                defaultValue={props.productData.amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="reg-fg">
              <Form.Label>Цена книги</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                placeholder="Введите цену"
                defaultValue={props.productData.price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Фото книги</Form.Label>
              <Form.Control
              type="file"
              size="lg"
              onChange={(event) => setFile(event.target.files[0])}/>
            </Form.Group>
            <Button
              variant="outline-secondary"
              className='ms-auto mt-3'
              type='submit'
            >Изменить данные</Button>
          </Form>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}
