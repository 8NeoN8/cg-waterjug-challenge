import WaterJugAlgorithm from "@/components/WaterJugAlgorithm.vue";
import { mount } from "@vue/test-utils";
describe("WaterJugAlgorithm.vue", () =>{
  it('Solves the puzzle with the given props', async () =>{
  const wrapper = mount(WaterJugAlgorithm, {
    propsData: {
      jugA: 5,
      jugB: 2,
      target: 1,
    },
    
  })
  await wrapper.find('button').trigger('click')
  expect(wrapper.text()).toContain('Initial State')
  })
})