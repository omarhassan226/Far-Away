import {  useState } from "react";


function App() {
  const [items, setItems] = useState([
    { id: 1, description: 'Passport', quantity: 2, packed: false },
    { id: 2, description: 'Shirts', quantity: 1, packed: false },
    { id: 3, description: 'Shampoo', quantity: 3, packed: false }])
  const [counter, setCounter] = useState(0)
  const [itemsBeforeDelete, setItemsBeforeDelete] = useState(0)


  function handleCheckbox(id) {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      );
      const packedCount = updatedItems.filter(item => item.packed).length;
      setCounter(packedCount);
      return updatedItems;
    });
  }

  function handleDelete(value) {
    const index = items.findIndex((item) => item === value)
    items.splice(index, 1)
    setItems([...items])
    setCounter((counter) => counter + 1)
    setItemsBeforeDelete((index) => index + 1)
  }

  function clearAll() {
    setItems([])
    setCounter(items.length + itemsBeforeDelete)
  }

  function filter(filter) {
    console.log(filter, items)
    let filteredItems = [...items];
    switch (filter) {
      case 'a':
        filteredItems.sort(function(a, b) { 
          return a.id - b.id;
        });
        break;
      case 'b':
        filteredItems.sort(function(a, b) { 
          return a.quantity - b.quantity;
        });
        break;
      default:
        filteredItems.sort(function(a, b) { 
          return a.packed - b.packed;
        });
    }
    setItems(filteredItems)
  }

  function filterByLetter() {
    const filterByLetter = items.filter((item) => item.index(0) === 'o')
    setItems(filterByLetter)
  }

  return (
    <>
      <div className="App">
        <Logo />
        <Form items={items} setItems={setItems} />
        <PackingList items={items} handleDelete={handleDelete} clearAll={clearAll} filter={filter} filterByLetter={filterByLetter} handleCheckbox={handleCheckbox} />
        <Stats items={items} counter={counter} />
      </div>
    </>
  );
}

function Logo() {
  return (
    <>
      <h1>🏝️ Far Away 🧳</h1>
    </>
  )
}

function Form({ items, setItems }) {
  const [inputValue, setInputValue] = useState('')
  const [quantityValue, setQuantityValue] = useState(1)
  // console.log(quantityValue);


  function handleChange(event) {
    const value = event.target.value
    setInputValue(value)
    console.log(value);
  }
  function handleQuantityChange(event) {
    const value = event.target.value
    setQuantityValue(value)
    console.log(value);
  }

  function handleAdd() {
    const newItem = {id:items.length+1 , description:inputValue , quantity:quantityValue , packed:false}
    setItems([...items, newItem])

  }


  function handleSubmit(event) {
    event.preventDefault()
    setInputValue('')
    setQuantityValue(1)
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select onChange={handleQuantityChange}>
          {
            Array.from({ length: 20 }, (_, i) => i + 1).map((listItem) => <option value={listItem} key={listItem}>{listItem}</option>)
          }
        </select>
        <input placeholder="items..." onChange={handleChange}></input>
        <button onClick={handleAdd}>Add</button>
      </form>
    </>
  )
}

function Item({ item, handleDelete, handleCheckbox }) {
  return (
    <li onClick={handleDelete}>
      <input type="checkbox" onClick={handleCheckbox} />
      <span style={item.packed === true ? { textDecoration: 'line-through' } : {}}>
        {item.quantity}
        {item.description}❌
      </span>
    </li>
  )
}

function PackingList({ items, handleDelete, clearAll, filter, filterByLetter, handleCheckbox }) {
  return (
    <div className="list" style={{ height: '41.7vh' }}>
      <ul>
      {items.map((item) => <Item item={item} key={item.id} handleCheckbox={() => handleCheckbox(item.id)} />)}
      </ul>
      <div className="actions">
        <select onChange={(e) => filter(e.target.value)}>
          <option value="a">Sort by input ID</option>
          <option value="b">Sort by Quantity</option>
          <option value="c">Sort by packed status</option>
        </select>

        <button onClick={clearAll}>Clear list</button>
      </div>
    </div>
  )
}

function Stats({ items, counter }) {
  return (
    <>
      <footer className="stats">
        <em>
          💼 You have {items.length} items on your list, and you already packed {counter} {counter * 10}% 👍
        </em>
      </footer>
    </>
  )
}

export default App;
