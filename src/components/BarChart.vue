<template>
  <!-- tudo deve vir abaixo dessa div -->
  <div class='barChart'>
  <h2> Bar Chart </h2>
    <button @click='getData'>Get Chart Data</button>

    <div v-if='charts'>
      <button @click='makeChart'>Make Chart</button>
      <button @click='charts=null'>Hide Chart</button>

      <div id='bar'>
        <svg width='960' height='500'>
        </svg>
      </div>
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
  name: 'barChart',
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

      var x = d3.scaleBand()
          .rangeRound([0, width]).padding(0.05) // Espaco entre uma barra e outra

      var y = d3.scaleLinear()
          .rangeRound([height, 0])

      // Neste caso, coloca todos os valores de x (mapeiando o objeto a propriedade)
      x.domain(this.charts.map(function (d) { return d.value_x }))

      // Extent retorna o min e o max da lista passada. Pode ter um callback
      y.domain(d3.extent(this.charts, function (d) { return d.value_y }))

      // Linha do eixo X
      g.append('g')
          .attr('transform', 'translate(0, ' + height + ')')
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
          // .attr('transform', 'rotate(-90)')
          .attr('y', 20)
          .attr('dy', '0.71em')
          .attr('text-anchor', 'end')
          .text('Y axis')

      // Preenchimento do Grafico em si
      g.selectAll('rect')
        .data(this.charts)
        .enter().append('rect')
          .attr('fill', 'steelblue')
          .attr('stroke', 'steelblue')
          .attr('stroke-width', 1.0)
          .attr('x', function (d) { return x(d.value_x) })
          .attr('y', function (d) { return y(d.value_y) })
          .attr('width', x.bandwidth())
          .attr('height', function (d) { return height - y(d.value_y) })
          .append('title')
          .text(function (d) { return d.description })
    }
  }

}
</script>
