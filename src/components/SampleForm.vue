<template>
    <div style="padding-top: 50px;">
      <form v-on:submit.prevent="postSample">
        <input type="text" v-model="description" id="description" placeholder="Description">
        <input type="number" step="any" id="value_x" v-model="value_x" placeholder="Value X">
        <input type="number" step="any" id="value_y" v-model="value_y" placeholder="Value Y">
        <br/>
        <br/>
        <button type="submit">{{btn_label}}</button>
      </form>
    </div>
</template>

<script>
  export default {
    name: 'sampleform',
    data () {
      return {
        id: null,
        description: '',
        value_x: null,
        value_y: null,
        btn_label: 'New Sample'
      }
    },
    mounted() {
      this.id = this.$route.params.id;
      if(this.id !== undefined){
        this.$http.get('http://127.0.0.1:8081/api/samples/'+this.id).then(response => {
          console.log(response.body);
          this.id = response.body.id;
          this.description = response.body.description;
          this.value_x = response.body.value_x;
          this.value_y = response.body.value_y;
          this.btn_label = 'Update';
        }, response => {
          console.log('Error: '+ response);
        });
      } else {
        this.clearForm();
      }
    },
    methods:{
      isFormValid() {
        if(this.description === ''){
          alert('Invalid description');
          return false;
        }

        if(this.value_x === null){
          alert('Invalid Value X');
          return false;
        }

        if(this.value_y === null){
          alert('Invalid Value Y');
          return false;
        }

        return true;
      },
      clearForm(){
        this.id = null;
        this.description = '';
        this.value_x = null;
        this.value_y = null;
        this.btn_label = 'New Sample';
      },
      postSample(){
        if(this.isFormValid()){
          if(this.id == null){
            this.$http.post('http://127.0.0.1:8081/api/sample/new', this.$data).then(response => {
              console.log(response.body);
              this.clearForm();
            }, response => {
              console.log('Error: '+response.code);
            });
          } else {
            this.$http.put('http://127.0.0.1:8081/api/sample/new', this.$data).then(response => {
              console.log(response.body);
              this.clearForm();
            }, response => {
              console.log('Error: '+response.code);
            });
          }
        }

      }
    }
  }
</script>
