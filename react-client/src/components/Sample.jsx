import { useState, useEffect } from "react";

const Sample = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

  const formSubmitHandle = (event) => {
    event.preventDefault();

    let fd = new FormData(event.target);
    let obj = Object.fromEntries(fd.entries());
    let login = { email: obj.txtEmail, password: obj.txtPassword };

    const action = event.nativeEvent.submitter.value; // which button was clicked?

    if (action === "add") {
      setFormData((prev) => [...prev, login]);
    } 
    else if (action === "update") {
     
      setFormData((prev) =>
        prev.map((item) =>
          item.email === login.email ? login : item
        )
      );
    } 
    else if (action === "delete") {
      
      setFormData((prev) =>
        prev.filter((item) => item.email !== login.email)
      );
    }
  };

  return (
    <>
      <form onSubmit={formSubmitHandle}>
        <input type="text" name="txtEmail" placeholder="Email" />
        <input type="password" name="txtPassword" placeholder="Password" />
        <button type="submit" value="add">Add</button>
        <button type="submit" value="update">Update</button>
        <button type="submit" value="delete">Delete</button>
      </form>

      <h3>Current Data:</h3>
      <ul>
        {formData.map((item, index) => (
          <li key={index}>
            {item.email} — {item.password}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sample;
