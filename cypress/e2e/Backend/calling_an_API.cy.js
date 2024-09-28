describe("Asynchronous testing with the PokeAPI", () => {
  it("Should get info from a Pokemon and check its result", () => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/pikachu";

    cy.request(apiUrl).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property("name", "pikachu");
      expect(response.body).to.have.property("id", 25);
      expect(response.body).to.have.property("base_experience");
      expect(response.body).to.have.property("height");
      expect(response.body).to.have.property("weight");
      expect(response.body).to.have.property("types");
    });
  });

  it("Should get information from multiple Pokemons and its abilities", () => {
    const pokemonList = ["pikachu", "bulbasaur", "charmander", "blastoise", "blaziken"];

    pokemonList.forEach((pokemon) => {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

      cy.request(apiUrl).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.property("name", pokemon);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("base_experience");
        expect(response.body).to.have.property("height");
        expect(response.body).to.have.property("weight");
        expect(response.body).to.have.property("types");
        expect(response.body).to.have.property("abilities");

        const abilityUrl = response.body.abilities[0].ability.url;

        cy.request(abilityUrl).then((abilityResponse) => {
          expect(abilityResponse.status).to.eq(200);

          expect(abilityResponse.body).to.have.property("name");
          expect(abilityResponse.body).to.have.property("effect_entries");
        });
      });
    });
  });
});
