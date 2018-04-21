<template>
  <section id='item'>
    <ul>
      <li v-for="id in itemArray">
        <div>
          <p>id: {{itemMap[id].id}}</p>
          <p>index: {{itemMap[id].index}}</p>
          <p>owner: {{itemMap[id].owner}}</p>
          <p>updated: {{itemMap[id].updated}}</p>
          <p>initialized: {{itemMap[id].initialized}}</p>
        </div>

        <div v-show="editing === id">
          <p><label>Name <input v-model="updateForm.name"></label></p>
          <p><label>Location <input v-model="updateForm.location"></label></p>
          <button @click="updateItem()">Update</button>
          <button @click="cancel(id)">Cancel</button>
        </div>

        <div v-show="editing !== id">
          <p>name: {{itemMap[id].name}}</p>
          <p>location: {{itemMap[id].location}}</p>
          <button @click="editItem(id)">Edit</button>
        </div>

        <button @click="deleteItem(id)">Delete</button>
      </li>
    </ul>

    <div>
      <label>
        Id <input v-model="createForm.id">
      </label>
      <label>
        Name <input v-model="createForm.name">
      </label>
      <label>
        Location <input v-model="createForm.location">
      </label>
      <button @click="createItem">Create</button>
    </div>
  </section>
</template>

<script>
  import Item from '@/js/item'

  export default {
    name: 'items',
    data () {
      return {
        itemArray: [],
        itemMap: {},
        countItem: 0,
        initialForm: {
          id: undefined,
          name: undefined,
          location: undefined,
        },
        createForm: {},
        updateForm: {},
        editing: undefined,
      }
    },
    beforeCreate: function () {
      Item.init(this.$web3).then(() => {
        this._reload();
        this.createForm = Object.assign({}, this.initialForm);
        this.updateForm = Object.assign({}, this.initialForm);
      })
    },
    methods: {
      _reload: function () {
        Item.countItem().then(result => {
          console.log(result);
          this.countItem = result;
          this.itemArray = [];

          for (let i = 0; i < this.countItem; i++) {
            Item.itemArray(i).then(id => {
              console.log(id);
              Item.itemMap(id).then(result => {
                console.log(result);
                this.itemMap[id] = result;
                this.itemArray.push(id);
              });
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      createItem: function () {
        if (typeof this.createForm.id !== 'undefined' && this.createForm.id !== '' &&
          typeof this.createForm.name !== 'undefined' && this.createForm.name !== '' &&
          typeof this.createForm.location !== 'undefined' && this.createForm.location !== ''
        ) {
          Item.createItem(this.createForm.id, this.createForm.name, this.createForm.location).then(tx => {
            console.log(tx);
            this._reload();
          }).catch(err => {
            console.log(err)
          })
        }
      },

      editItem: function (id) {
        this.updateForm.id = this.itemMap[id].id;
        this.updateForm.name = this.itemMap[id].name;
        this.updateForm.location = this.itemMap[id].location;
        this.editing = id;
      },

      cancel: function (id) {
        this.editing = undefined;
      },

      updateItem: function () {
        if (typeof this.updateForm.id !== 'undefined' && this.updateForm.id !== '' &&
          typeof this.updateForm.name !== 'undefined' && this.updateForm.name !== '' &&
          typeof this.updateForm.location !== 'undefined' && this.updateForm.location !== ''
        ) {
          Item.updateItem(this.updateForm.id, this.updateForm.name, this.updateForm.location).then(tx => {
            console.log(tx);
            this._reload();
            this.updateForm = Object.assign({}, this.initialForm);
            this.editing = undefined;
          }).catch(err => {
            console.log(err)
          })
        }
      },

      deleteItem: function (id) {
        Item.deleteItem(id).then(tx => {
          console.log(tx);
          this._reload();
        }).catch(err => {
          console.log(err)
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  p {
    margin: 0;
  }

  li {
    margin-bottom: 30px;
  }
</style>
