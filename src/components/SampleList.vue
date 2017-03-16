<template>
  <table v-if="samples.length" style="width: 100%;" border=1>
    <tr>
      <th>ID</th>
      <th>Description</th>
      <th>X</th>
      <th>Y</th>
      <th>DEL</th>
      <th>EDIT</th>
    </tr>
    <tr v-for="(sample, index) in samples" >
      <td>{{sample.id}}</td>
      <td>{{sample.description}}</td>
      <td>X = {{sample.value_x}}</td>
      <td>Y = {{sample.value_y}}</td>
      <td><button v-on:click="deleteSample(sample.id, index)">DEL</button></td>
      <td><button v-on:click="editSample(sample.id)">EDIT</button></td>
    </tr>
  </table>
</template>

<script>
export default{
  name: 'samplelist',
  data() {
    return {
      samples: []
    }
  },
  mounted() {
    this.loadSamples();
  },
  methods: {
    loadSamples(){
      this.$http.get("http://127.0.0.1:8081/api/samples").then(response => {
        this.samples = response.body;
      }, response =>{
        console.log('Error: '+response.code);
      });
    },
    deleteSample(id, index){
      this.$http.delete("http://127.0.0.1:8081/api/sample/delete/"+id).then(response => {
        alert('Deletado.');
        this.samples.splice(index, 1);
      }, response => {
        console.log('Error: '+response.code);
      });
    },
    editSample(id){
      this.$router.push('/form/'+id);
    }
  }


}

</script>
