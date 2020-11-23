import pathify from "vuex-pathify";
import compositionApi from "@vue/composition-api";
const pathifyInCompositionInstance = {
  setup(props, context) {
    const bindings = compositionApi.bind(context.root.$store);
    return bindings;
  }
};
export default pathifyInCompositionInstance;
