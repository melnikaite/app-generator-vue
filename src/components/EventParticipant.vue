<template>
  <section id='event-participant'>
    <ul id="example-1">
      <li v-for="event in cache.eventMap">
        {{ event }}
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
        <button @click="createEvent" name="create">Create</button>
      </div>
    </div>
  </section>
</template>

<script>
  import EventParticipant from '@/js/event-participant'

  export default {
    name: 'event-participant',
    data () {
      return {
        cache: {
          eventMap: [],
          countEvent: 0,
        },
        form: {
          id: undefined,
          name: undefined,
        }
      }
    },
    beforeCreate: function () {
      EventParticipant.init().then(() => this._reload())
    },
    methods: {
      _reload: function () {
        EventParticipant.countEvent().then(result => {
          console.log(result);
          this.cache.countEvent = result;

          for (let i = 0; i < this.cache.countEvent; i++) {
            EventParticipant.readEventByIndex(i).then(result => {
              console.log(result);
              this.cache.eventMap.push(result);
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(err => {
          console.log(err)
        })
      },

      createEvent: function () {
        if (typeof this.form.id !== 'undefined' && this.form.id !== '' &&
          typeof this.form.name !== 'undefined' && this.form.name !== '') {
          EventParticipant.createEvent(this.form.id, this.form.name).then(tx => {
            console.log(tx);
            this._reload();
          }).catch(err => {
            console.log(err)
          })
        }
      },

      updateEvent: function () {
        if (typeof this.form.id !== 'undefined' && this.form.id !== '' &&
          typeof this.form.name !== 'undefined' && this.form.name !== '') {
          EventParticipant.updateEvent(this.form.id, this.form.name).then(tx => {
            console.log(tx);
            this._reload();
          }).catch(err => {
            console.log(err)
          })
        }
      },

      deleteEvent: function () {
        if (typeof this.form.id !== 'undefined' && this.form.id !== '') {
          EventParticipant.deleteEvent(this.form.id, this.form.name).then(tx => {
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

</style>
