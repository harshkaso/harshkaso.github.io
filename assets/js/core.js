document.addEventListener('DOMContentLoaded', () => {
    const hasSkeletons = document.querySelectorAll('.has-skeleton');
    const isSkeletons = document.querySelectorAll('.is-skeleton');
    let toggleSkeletons = () => {
      hasSkeletons.forEach((el) => {
        el.classList.toggle("has-skeleton");
      });

      isSkeletons.forEach((el) => {
        el.classList.toggle("is-skeleton");
      });
    }
    
    setTimeout(toggleSkeletons, 1000);
});
