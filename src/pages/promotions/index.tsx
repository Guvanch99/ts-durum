import React, {Component} from 'react'

import {PromoCode, PromoDay} from '../../components'

export class Promotions extends Component {
  render() {
    return (
      <section className="promotions">
        <PromoDay/>
        <PromoCode/>
      </section>
    )
  }
}

export default Promotions
