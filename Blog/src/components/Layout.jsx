import React from "react";
import PropTypes from "prop-types";

const Layout = (props) => {
  return (
    <>
      <div className="sub-container">
        <h2>Title: {props.title}</h2>
        <p>Description:{props.des}</p>
        <p>Date: {props.date}</p>
      </div>
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
  date: PropTypes.string,
};

export default Layout;

/* 
 <Container>
        <Layout
          title="Heading 1"
          des="hello this is blog 1 Heading. "
          date="07/01/2024"
        />
        <Layout
          title="Heading 2"
          des="hello this is blog 2 Heading. "
          date="07/01/2024"
        />
        <Layout
          title="Heading 3"
          des="hello this is blog 3 Heading. "
          date="07/01/2024"
        />
      </Container>
      <Container>
        <Image img={react} />
        <Image img={react} />
        <Image img={react} />
      </Container>
*/
