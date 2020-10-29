import './App.scss';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputGroup, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [games_, setGames_] = useState([]);

  useEffect(() => {
    const filteredGames = games_.filter(game_ =>
      game_.name.toLowerCase().includes(search));
    setGames(filteredGames);
  }, [search, games_]);

  useEffect(() => {
    fetch('http://localhost:3000/games').then(resp => resp.json()).then(data => setGames_(data));
  }, []);

  function handleClick() {
    alert('That concludes the end of this demo!');
  }

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <Navbar>
        <Navbar.Brand href="#" id="title">SLOTS</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <InputGroup>
              <FormControl
                placeholder="Search"
                onChange={handleSearch}
                />
              <InputGroup.Append>
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <CardColumns id="cardsColumn">
            {games.map((game) => {
              return (
                <OverlayTrigger
                key={game.id}
                placement="bottom"
                overlay={<Tooltip key={game.id}>{game.name}</Tooltip>}
                >
                <Card key={game.id} className={game.class} onClick={handleClick}>
                  <Card.Img src={game.src} />
                </Card>
                </OverlayTrigger>
              );
            })}
          </CardColumns>
    </div>
  );
}

export default App;
