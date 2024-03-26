import WaterJugAlgorithm from "@/components/WaterJugAlgorithm.vue";
import { mount } from "@vue/test-utils";
describe("WaterJugAlgorithm.vue", () =>{
  it('Solves the puzzle with the given props', async () =>{
  const wrapper = mount(WaterJugAlgorithm, {
    propsData: {
      jugA: 39,
      jugB: 27,
      target: 19,
    },
    
  })
  await wrapper.find('button').trigger('click')
  expect(wrapper.text()).toContain('There is no solution')
  })
})