<template>
  <section id='entityname'>
    <h4>Entitynames Registry</h4>

    <b-table hover :items="entitynameArray" :fields="fields" v-show="countEntityname > 0">
      <template slot="id" slot-scope="data">
        {{entitynameMap[data.item].id}}
      </template>

_tableFieldTemplate_

      <template slot="actions" slot-scope="data">
        <span v-show="editing === data.item">
          <b-button @click="updateEntityname(data.item)">Update</b-button>
          <b-button @click="cancelEditing()">Cancel</b-button>
        </span>
        <span v-show="editing !== data.item">
          <b-button @click="editEntityname(data.item)">Edit</b-button>
        </span>
        <b-button @click="deleteEntityname(data.item)">Delete</b-button>
      </template>
    </b-table>

    <p class="lead" v-show="countEntityname < 1">No Entitynames, you may create one</p>

    <h3>Create new Entityname</h3>

    <b-form @submit="createEntityname" @reset="cancelCreating">
      <b-form-group horizontal id="idGroup" label="ID" label-for="id">
        <b-form-input id="id" v-model="createForm.id" required></b-form-input>
      </b-form-group>
_createFormGroup_

      <b-button type="submit" variant="primary" size="lg">Submit</b-button>
      <b-button type="reset" variant="danger" size="lg">Reset</b-button>
    </b-form>
  </section>
</template>

<script>
  import Entityname from '@/js/entityname'

  export default {
    name: 'entitynames',
    data() {
      return {
        fields: ['id', _valueQuotedCommaSeparated_, 'actions'],
        entitynameArray: [],
        entitynameMap: {},
        countEntityname: 0,
        initialForm: {
          id: undefined,
_valueUndefinedCommaSeparated_
        },
        createForm: {},
        updateForm: {},
        editing: undefined,
      }
    },
    beforeCreate: function () {
      Entityname.init(this.$web3).then(() => {
        this._reload();
        this.createForm = Object.assign({}, this.initialForm);
        this.updateForm = Object.assign({}, this.initialForm);
      })
    },
    methods: {
      _reload: function () {
        Entityname.countEntityname().then(result => {
          console.log(result);
          this.countEntityname = result;
          this.entitynameArray = [];

          for (let i = 0; i < this.countEntityname; i++) {
            Entityname.entitynameArray(i).then(id => {
              console.log(id);
              Entityname.entitynameMap(id).then(result => {
                console.log(result);
                this.entitynameMap[id] = result;
                this.entitynameArray.push(id);
              });
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      createEntityname: function (evt) {
        evt.preventDefault();
        Entityname.createEntityname(this.createForm.id, _thisCreateFormCommaSeparated_).then(tx => {
          console.log(tx);
          this._reload();
          this.createForm = Object.assign({}, this.initialForm);
        }).catch(err => {
          console.log(err)
        })
      },

      editEntityname: function (id) {
        this.updateForm.id = this.entitynameMap[id].id;
_thisUpdateFormNewLineSeparated_
        this.editing = id;
      },

      cancelEditing: function () {
        this.editing = undefined;
      },

      cancelCreating: function () {
        this.createForm = Object.assign({}, this.initialForm);
      },

      updateEntityname: function (id) {
        [_valueQuotedCommaSeparated_].forEach((field) => this.$refs['item-' + field + '-' + id].$el.reportValidity());
        if (![_valueQuotedCommaSeparated_].map(
          (field) => this.$refs['item-' + field + '-' + id].$el.checkValidity()
        ).includes(false)) {
          Entityname.updateEntityname(this.updateForm.id, _thisUpdateFormCommaSeparated_).then(tx => {
            console.log(tx);
            this._reload();
            this.updateForm = Object.assign({}, this.initialForm);
            this.editing = undefined;
          }).catch(err => {
            console.log(err)
          })
        }
      },

      deleteEntityname: function (id) {
        if (confirm('Are you sure?')) {
          Entityname.deleteEntityname(id).then(tx => {
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
