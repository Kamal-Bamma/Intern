import Container from "./components/Container";
import Image from "./components/Image";
import react from "./assets/react.svg";
import Blog from "./components/Blog";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";

function App() {
  return (
    <>
      <Container>
        <Blog category="" img={img1} title="" desc="" />
        <Blog category="" img={img2} title="" desc="" />
        <Blog category="Earth" img={img3} title="" desc="" />
      </Container>
      <Container>
        <Image image={react} auth="" />
        <Image image={react} auth="" />
        <Image image={react} auth="" />
      </Container>
    </>
  );
}

export default App;
