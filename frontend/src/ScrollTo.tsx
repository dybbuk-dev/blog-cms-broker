import $ from 'jquery';

const ScrollTo = (id) => {
  const els = $(`[id='${id}']`);
  if (els.length > 0) {
    window.scrollTo({
      top: els.eq(0).offset().top,
      behavior: 'smooth',
    });
  }
};

export default ScrollTo;
