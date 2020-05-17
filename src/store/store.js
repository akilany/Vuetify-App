import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification
  },
  state: {
    events: [],
    categories: [
      'Cafe',
      'Restaurant',
      'Canteen',
      'Inn',
      'Bar'
    ],
    nationalities: [
      'Egyption',
      'Italian',
      'American',
      'European',
      "Asian",
      'Arabian'
    ],
    eventsTotal: 0,
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    UPDATE_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({
      commit,
      dispatch
    }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your place has been created successfully.'
          }
          dispatch('notification/add', notification, {
            root: true
          })
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: `There was a problem creating your place: ${err.message}`
          }
          dispatch('notification/add', notification, {
            root: true
          })
          throw err
        })
    },
    updateEvent({
      commit,
      dispatch
    }, {
      id,
      event
    }) {
      return EventService.updateEvent(id, event)
        .then(() => {
          commit('UPDATE_EVENT', event)
          const notification = {
            type: 'success',
            message: 'Your place has been updated successfully.'
          }
          dispatch('notification/add', notification, {
            root: true
          })
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: `There was a problem updating your place: ${err.message}`
          }
          dispatch('notification/add', notification, {
            root: true
          })
          throw err
        })
    },
    deleteEvent({
        dispatch
      },
      id
    ) {
      return EventService.deleteEvent(id)
        .then(() => {
          const notification = {
            type: 'success',
            message: 'Your place has been deleted successfully.'
          }
          dispatch('notification/add', notification, {
            root: true
          })
        })
        .catch(err => {
          const notification = {
            type: 'error',
            message: `There was a problem deleteing your place: ${err.message}`
          }
          dispatch('notification/add', notification, {
            root: true
          })
          throw err
        })
    },
    fetchEvents({
      commit,
      dispatch
    }, {
      perPage,
      page
    }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
          commit('SET_EVENTS', response.data);
        })
        .catch((err) => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching data: ${err.message}`
          }
          dispatch('notification/add', notification, {
            root: true
          })
        });
    },
    fetchEvent({
      commit,
      getters,
      dispatch
    }, id) {
      let event = getters.getEventByID(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit('SET_EVENT', response.data)
          })
          .catch((err) => {
            const notification = {
              type: 'error',
              message: `There was a problem fetching data: ${err.message}`
            }
            dispatch('notification/add', notification, {
              root: true
            })
          });
      }
    }
  },
  getters: {
    getEventByID: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})