import { A } from "@solidjs/router";
import { Component, For, createResource } from "solid-js";
import Nav from "../Components/Nav";

type Hotel = {
  id: string;
  name: string;
  description: string;
  slug: string;
};

const fetchHotels = async () => {
  return (await fetch("http://localhost:5062/api/hotel")).json();
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
