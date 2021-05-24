<template>
  <div class="table-responsive">
    <table class="table table-striped custom-table" 
    id="my-table2"
    :per-page="perPage"
    :current-page="currentPage"
    >
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성자</th>
          <th scope="col">
            작성 시간
            <small class="d-block text-secondary">수정된 시간</small>
            </th>
        </tr>
      </thead>
      <tbody>
        <tr scope="row" v-for="(item, idx) in items" :key="idx">
          <td>
            {{ item.id }}
          </td>
          <td><a href="#">{{ item.title }}</a></td>
          <td>{{ item.user_id }}</td>
          <td>
            {{ item.created_at }}
            <small class="d-block">{{ item.updated_at }} </small>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      id="page"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table2"
      align="center"
      style=""
    ></b-pagination>
  </div>
</template>

<script scoped>
import axios from 'axios'

export default {
  name: 'Articles',
  data: function () {
    return {
      perPage: 3,
      currentPage: 1,
      items: []
    }
  },
  computed: {
    rows() {
      return this.items.length
    },
  },
  created: function () {
    axios.get('http://127.0.0.1:8000/community')
      .then(res => {
        this.items = res.data
      })
  }
}
</script>

<style>
body {
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  background-color: #3c373e;
  font-weight: 300; }

p {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300; }

h1, h2, h3, h4, h5, h6,
.h1, .h2, .h3, .h4, .h5, .h6 {
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }

a {
  -webkit-transition: .3s all ease;
  -o-transition: .3s all ease;
  transition: .3s all ease; }
  a, a:hover {
    text-decoration: none !important; }

.article-content {
  padding: 7rem 0; }

h2 {
  font-size: 20px;
  color: #fff; }

.custom-table {
  min-width: 900px; }
  .custom-table thead tr, .custom-table thead th {
    padding-bottom: 30px;
    border-top: none;
    border-bottom: none !important;
    color: #fff;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: .2rem; }
  .custom-table tbody th, .custom-table tbody td {
    color: #777;
    font-weight: 400;
    padding-bottom: 20px;
    padding-top: 20px;
    font-weight: 300;
    border: none;
    -webkit-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease; }
    .custom-table tbody th small, .custom-table tbody td small {
      color: rgba(255, 255, 255, 0.3);
      font-weight: 300; }
    .custom-table tbody th a, .custom-table tbody td a {
      color: rgba(255, 255, 255, 0.3); }
    .custom-table tbody th .more, .custom-table tbody td .more {
      color: rgba(255, 255, 255, 0.3);
      font-size: 11px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: .2rem; }
  .custom-table tbody tr {
    -webkit-transition: .3s all ease;
    -o-transition: .3s all ease;
    transition: .3s all ease; }
    .custom-table tbody tr:hover td, .custom-table tbody tr:focus td {
      color: #fff; }
      .custom-table tbody tr:hover td a, .custom-table tbody tr:focus td a {
        color: #fdd114; }
      .custom-table tbody tr:hover td .more, .custom-table tbody tr:focus td .more {
        color: #fdd114; }
  .custom-table .td-box-wrap {
    padding: 0; }
  .custom-table .box {
    background: #fff;
    border-radius: 4px;
    margin-top: 15px;
    margin-bottom: 15px; }
    .custom-table .box td, .custom-table .box th {
      border: none !important; }

</style>