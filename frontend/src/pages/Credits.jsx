function Credits() {
  return (
    <div className="Header">
      <h1>Credits</h1>
      <p>This project was created for educational and fan-made purposes. </p>
      <p>
        All Pokémon names, images, sprites, and related intellectual property
        belong to
        <strong>
          {" "}
          © 1995-2025 Nintendo / Creatures Inc. / GAME FREAK Inc.
        </strong>
      </p>

      <p>
        Pokémon data and resources are provided by the public API:
        <br />
        <a
          href="https://pokeapi.co/"
          style={{ color: "#3b4cca", fontWeight: "bold" }}
        >
          https://pokeapi.co/
        </a>
      </p>

      <p>
        This website is not affiliated with or endorsed by Nintendo, The Pokémon
        Company, or GAME FREAK. All trademarks and copyrights belong to their
        respective owners.
      </p>

      <p style={{ marginTop: "20px", fontSize: "0.9em", color: "#666" }}>
        Web application developed using the MERN Stack (MongoDB, Express, React,
        Node.js). Designed and built by Ying Jie Mei.
      </p>
    </div>
  );
}

export default Credits;
