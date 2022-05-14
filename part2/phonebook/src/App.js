import React, { useState, useEffect } from "react";
import Persons from "./Persons";
import Form from "./Form";
import Filter from "./Filter";
import Notification from "./Notification";
import personsService from "./service/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [results, setResults] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setResults(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (results.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Do you want to change phone number`
        )
      ) {
        results.forEach((person, index) => {
          if (person.name === newName) {
            const modifiedResults = [...results];
            modifiedResults[index].number = newNumber;
            personsService
              .update(person.id, modifiedResults)
              .then(setResults(modifiedResults))
              .catch(() => {
                setErrorMessage("This person does not exist");
                setError(true);
                personsService.getAll().then((initialPersons) => {
                  setPersons(initialPersons);
                  setResults(initialPersons);
                });
              });
          }
        });
      }
    } else {
      const newPersons = { name: newName, number: newNumber };
      personsService
        .create(newPersons)
        .then((updatedPersons) => {
          setPersons(persons.concat(updatedPersons));
          setResults(results.concat(updatedPersons));
          setErrorMessage("Successful");
        })
        .catch((error) => {
          setErrorMessage(error.response.data);
          console.log(error.response.data);
        });
    }
    setTimeout(() => {
      setErrorMessage(null);
      setError(false);
    }, 5000);
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    const searchString = event.target.value.toLowerCase().split(" ");
    const filterPersons = persons.filter((person) => {
      let containsAtLeastOneWord = false;
      searchString.forEach((word) => {
        if (person.name.toLowerCase().includes(word))
          containsAtLeastOneWord = true;
      });
      if (containsAtLeastOneWord) {
        return person;
      } else {
        return null;
      }
    });
    setResults(filterPersons);
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this person?")) {
      const updatedPersons = results.filter((result) => result.id !== id);
      setPersons(updatedPersons);
      setResults(updatedPersons);
      personsService.remove(id);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage ? (
        <Notification message={errorMessage} error={error} />
      ) : null}
      <Filter handleFilter={handleFilter} />
      <Form
        handleChangeName={handleChangeName}
        handleSubmit={handleSubmit}
        handleChangeNumber={handleChangeNumber}
      />
      <Persons results={results} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
