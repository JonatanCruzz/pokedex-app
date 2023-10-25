import Image from './Image';

function VistaBettle() {
  return (
    <div className="App">
      <div className="grid grid-cols-2 gap-4">
        <Image src="https://i.imgur.com/1QZ5z9K.jpg" alt="Escarabajo" />
        <div className="grid grid-cols-2 gap-4">
          <Image src="https://i.imgur.com/1QZ5z9K.jpg" alt="Escarabajo" />
          <Image src="https://i.imgur.com/1QZ5z9K.jpg" alt="Escarabajo" />
          <Image src="https://i.imgur.com/1QZ5z9K.jpg" alt="Escarabajo" />
          <Image src="https://i.imgur.com/1QZ5z9K.jpg" alt="Escarabajo" />
        </div>
      </div>
    </div>
  );
}

export default VistaBettle;