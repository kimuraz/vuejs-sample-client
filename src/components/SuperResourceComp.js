module.exports = {
  data() {
    return{
      obj: null,
      server: 'http://127.0.0.1:8081',
      path: '',
      params: ''
    }
  },
  methods: {
    doGet(){
      console.log(this.server+path+params);
      this.$http.get(this.server+path+params).then(response => {
        console.log(response.code);
        this.obj = response.body;
      }, response => {
        console.log('Error: '+ response);
      });
    }
  }

}
