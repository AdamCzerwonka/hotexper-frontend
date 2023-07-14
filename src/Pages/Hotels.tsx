import { A } from "@solidjs/router";
import { Component, For, createResource } from "solid-js";
import Nav from "../Components/Nav";
import { GetApiPath } from "../Services/ApiService";
import Hotel from "../Types/Hotel";

const fetchHotels = async () => {
  const url = GetApiPath("/hotel");
  return (await fetch(url)).json();
};

const Hotels: Component = () => {
  const [hotels] = createResource<Hotel[]>(fetchHotels);
  return (
    <>
      <div class="max-w-screen-2xl mx-auto">
        <Nav />
        <For each={hotels()}>
          {(hotel, _) => (
            <div>
              <h2>{hotel.name}</h2>
              <p>{hotel.description}</p>
              <A href={`/hotel/${hotel.slug}`}>Read more...</A>
            </div>
          )}
        </For>
      </div>
    </>
  );
};

export default Hotels;
