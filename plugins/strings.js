export default (context, inject) => {
  const toTitleCase = phrase => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  // Inject $hello(msg) in Vue, context and store.
  inject("toTitleCase", toTitleCase);
  // For Nuxt <= 2.12, also add 👇
  context.$toTitleCase = toTitleCase;
};
