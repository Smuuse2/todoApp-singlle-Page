import api from "./api";


class TodoServices {
   findAll(){
    return api.get("/allData")
   }
   create(data){
    return api.post('/create',data)
   }

   elete(id) {
    return api.delete(`/delete/${id}`);
  }
  update(id,data) { 
    return api.put(`/updated/${id}`,data) 
   }

}


export default new TodoServices();