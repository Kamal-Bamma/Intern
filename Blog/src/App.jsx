import Container from "./components/Container";
import Image from "./components/Image";
import Blog from "./components/Blog";
import Data from "./components/data.json";

function App() {
  return (
    <>
      <Container>
        {Data.map((data, key) => {
          return (
            <div key={key}>
              <Blog
                key={key}
                category={data.category}
                img={data.image}
                title={data.title}
                desc={data.desc}
              />
            </div>
          );
        })}
      </Container>
      <Container>
        {Data.map((data, key) => {
          return (
            <div key={key}>
              <Image key={key} image={data.images} auth={data.author} />
            </div>
          );
        })}
      </Container>
    </>
  );
}

export default App;
