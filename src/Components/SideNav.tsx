import { A } from "@solidjs/router";
import { Component } from "solid-js";

const SideNav: Component = () => {
  return (
    <aside class="w-full sm:w-1/3 md:w-1/5 px-2">
      <div class="sticky top-0">
        <ul class="flex flex-col overflow-hidden">
          <li class="w-full">
            <A
              activeClass="border-black"
              inactiveClass="border-transparent"
              class="text-center block py-2 w-full border rounded hover:border-white"
              href="/users"
            >
              Users
            </A>
          </li>
          <li class="w-full py-2 my-1 text-center border border-black rounded">
            <A href="/hotels">Hotels</A>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
