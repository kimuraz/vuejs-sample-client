<template>
  <div class='lineChart'>
  <h2> Line Chart </h2>
    <button @click='getData'>Get Chart Data</button>

    <div v-if='charts'>
      <button @click='makeChart'>Make Chart</button>
      <button @click='charts=null'>Hide Chart</button>
      <button @click='see=!see'>Raw Data</button>

      <div id='resize'>
        <svg width='960' height='500'>
        </svg>
      </div>

      <li v-if='charts && see' v-for='chart in charts'>
        {{ chart.description }}
      </li>
    </div>

    <div v-else>
      NO CHARTS HERE YET! :(
    </div>
  </div>
</template>

<script>
import 'vue-resource'
import * as d3 from 'd3'

export default {
  name: 'lineChart',
  data () {
    return {
      charts: this.getData(),
      see: false
    }
  },
  methods: {
    getData () {
      this.$http.get('http://localhost:8081/api/samples/').then(response => {
        this.charts = response.body;
      }, errResponse => {
        console.log(errResponse)
      })
    },
    makeChart () {
      var svg = d3.select('svg')
      svg.selectAll('*').remove()
      var margin = {top: 20, right: 20, bottom: 30, left: 50}
      var width = +svg.attr('width') - margin.left - margin.right
      var height = +svg.attr('height') - margin.top - margin.bottom
      var g = svg.append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      var x = d3.scaleLinear()
          .rangeRound([0, width])

      var y = d3.scaleLinear()
          .rangeRound([height, 0])

      x.domain(d3.extent(this.charts, function (d) { return d.value_x }))
      y.domain(d3.extent(this.charts, function (d) { return d.value_y }))

      // Linha do eixo X
      g.append('g')
          .attr('transform', 'translate(0, ' + height / 2 + ')')
          .call(d3.axisBottom(x))
        .append('text')
          .attr('fill', '#000')
          .attr('text-anchor', 'end')
          .attr('transform', 'translate(' + width + ', 0)')
          .text('X axis')
        .select('.domain')
          .remove()

      // Linha do eixo Y
      g.append('g')
          .call(d3.axisLeft(y))
        .append('text') // Todos se referem ao text
          .attr('fill', '#000')
          .attr('transform', 'rotate(-90)')
          .attr('y', 20)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Y axis')

      // Preenchimento do Grafico em si
      var line =
      d3.line()
          .x(function (d) { return x(d.value_x) })
          .y(function (d) { return y(d.value_y) })
          .curve(d3.curveNatural)
          .defined(function (d) { return d.value_x })

      g.append('path')
          .datum(this.charts)
          .attr('fill', 'transparent')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1)
          .attr('d', line)

      g.selectAll('circle')
        .data(this.charts)
        .enter().append('circle')
          .attr('fill', 'white')
          .attr('cx', line.x())
          .attr('cy', line.y())
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.5)
          .attr('r', 3.5)
          .append('title')
          .text(function (d) { return d.description })
    }
  }

}
</script>
