import React from "react";
import '../styles/products.scss'

const Products = () => {
  return (
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
    <div class="section-one">
      <h2 class="section-one__title">Awesome Section - 1</h2>
      <p class="section-one__descr">Not far stuff she think the jokes. Going as by do known noise he wrote round leave. Warmly put branch people narrow see. Winding its waiting yet parlors married own feeling. Marry fruit do spite jokes an times. Whether at it unknown warrant herself
        winding if. Him same none name sake had post love. An busy feel form hand am up help. Parties it brother amongst an fortune of. Twenty behind wicket why age now itself ten.</p>
      <div class="separator">
        <svg class="separator__svg" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#14222E" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 100 V 10 L 0 100"/>
          <path d="M 30 73 L 100 18 V 10 Z" fill="#1a2d3d" stroke-width="0"/>
          </svg>
      </div>
    </div>
    <div class="section-two">
      <h2 class="section-two__title">Awesome Section - 2</h2>
      <p class="section-two__descr">From they fine john he give of rich he. They age and draw mrs like. Improving end distrusts may instantly was household applauded incommode. Why kept very ever home mrs. Considered sympathize ten uncommonly occasional assistance sufficient not. Letter
        of on become he tended active enable to. Vicinity relation sensible sociable surprise screened no up as.</p>
    </div>
    </div>
  );
};
export default Products;