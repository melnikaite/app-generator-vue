<template>
  <section id='item'>
    <ul>
      <li v-for="id in itemArray">
        id: {{$web3.toAscii(id)}}
        item: {{ itemMap[id] }}
        <button @click="deleteItem(id)" name="delete">Delete</button>
      </li>
    </ul>

    <div class="form">
      <div class="entry">
        <label>
          Id <input name="id" v-model="form.id">
        </label>
        <label>
          Name <input name="name" v-model="form.name">
        </label>
        <label>
          Location <input name="name" v-model="form.location">
        </label>
        <button @click="createItem" name="create">Create</button>
      </div>
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
        form: {
          id: undefined,
          name: undefined,
          location: undefined,
        }
      }
    },
    beforeCreate: function () {
      Item.init(this.$web3).then(() => this._reload())
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
        if (typeof this.form.id !== 'undefined' && this.form.id !== '' &&
          typeof this.form.name !== 'undefined' && this.form.name !== '' &&
          typeof this.form.location !== 'undefined' && this.form.location !== ''
        ) {
          Item.createItem(this.form.id, this.form.name, this.form.location).then(tx => {
            console.log(tx);
            this._reload();
          }).catch(err => {
            console.log(err)
          })
        }
      },

      updateItem: function () {
        if (typeof this.form.id !== 'undefined' && this.form.id !== '' &&
          typeof this.form.name !== 'undefined' && this.form.name !== '' &&
          typeof this.form.location !== 'undefined' && this.form.location !== ''
        ) {
          Item.updateItem(this.form.id, this.form.name, this.form.location).then(tx => {
            console.log(tx);
            this._reload();
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

</style>
