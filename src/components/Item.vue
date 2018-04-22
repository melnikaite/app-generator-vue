<template>
  <section id='item'>
    <b-table striped hover :items="itemArray" :fields="fields" v-show="countItem > 0">
      <template slot="id" slot-scope="data">
        {{itemMap[data.item].id}}
      </template>

      <template slot="name" slot-scope="data">
        <div v-show="editing === data.item">
          <b-form-input v-model="updateForm.name" required :ref="'item-name-' + data.item"></b-form-input>
        </div>
        <div v-show="editing !== data.item">
          {{itemMap[data.item].name}}
        </div>
      </template>

      <template slot="location" slot-scope="data">
        <div v-show="editing === data.item">
          <b-form-input v-model="updateForm.location" required :ref="'item-location-' + data.item"></b-form-input>
        </div>
        <div v-show="editing !== data.item">
          {{itemMap[data.item].location}}
        </div>
      </template>

      <template slot="actions" slot-scope="data">
        <span v-show="editing === data.item">
          <b-button @click="updateItem(data.item)">Update</b-button>
          <b-button @click="cancelEditing()">Cancel</b-button>
        </span>
        <span v-show="editing !== data.item">
          <b-button @click="editItem(data.item)">Edit</b-button>
        </span>
        <b-button @click="deleteItem(data.item)">Delete</b-button>
      </template>
    </b-table>

    <b-form @submit="createItem" @reset="cancelCreating">
      <b-form-group horizontal id="idGroup" label="ID" label-for="id">
        <b-form-input id="id" v-model="createForm.id" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal breakpoint="md" id="nameGroup" label="Name" label-for="name">
        <b-form-input id="name" v-model="createForm.name" required></b-form-input>
      </b-form-group>
      <b-form-group horizontal breakpoint="md" id="locationGroup" label="Location" label-for="location">
        <b-form-input id="location" v-model="createForm.location" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </section>
</template>

<script>
  import Item from '@/js/item'

  export default {
    name: 'items',
    data() {
      return {
        fields: ['id', 'name', 'location', 'actions'],
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
      createItem: function (evt) {
        evt.preventDefault();
        Item.createItem(this.createForm.id, this.createForm.name, this.createForm.location).then(tx => {
          console.log(tx);
          this._reload();
          this.createForm = Object.assign({}, this.initialForm);
        }).catch(err => {
          console.log(err)
        })
      },

      editItem: function (id) {
        this.updateForm.id = this.itemMap[id].id;
        this.updateForm.name = this.itemMap[id].name;
        this.updateForm.location = this.itemMap[id].location;
        this.editing = id;
      },

      cancelEditing: function () {
        this.editing = undefined;
      },

      cancelCreating: function () {
        this.createForm = Object.assign({}, this.initialForm);
      },

      updateItem: function (id) {
        ['name', 'location'].forEach((field) => this.$refs['item-' + field + '-' + id].$el.reportValidity());
        if (!['name', 'location'].map(
          (field) => this.$refs['item-' + field + '-' + id].$el.checkValidity()
        ).includes(false)) {
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
        if (confirm('Are you sure?')) {
          Item.deleteItem(id).then(tx => {
            console.log(tx);
            this._reload();
          }).catch(err => {
            console.log(err)
          })
        }
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
