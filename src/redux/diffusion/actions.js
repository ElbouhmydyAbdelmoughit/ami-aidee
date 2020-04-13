import { createAction } from '../../utils'

// Types
export const types = {
  PREDIFFUSION_REQUEST: 'PREDIFFUSION_REQUEST',
  DIFFUSION_REQUEST: 'DIFFUSION_REQUEST',
}

// Actions
export default {
  diffusionRequest: message =>
    createAction(types.DIFFUSION_REQUEST, { message }),
  prediffusionRequest: message =>
    createAction(types.PREDIFFUSION_REQUEST, { message }),
}
