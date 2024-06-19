<template>
  <div class="profile-container">
    <div class="profile">
      <h1>Postingan Pengguna</h1>
      <div class="user-selection">
        <select id="users" v-model="selectedUserId" @change="loadUserPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="user-posts">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else>
          <table class="post-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in userPosts" :key="post.id">
                <td>{{ post.title }}</td>
                <td>{{ post.body }}</td>
                <td class="actions">
                  <button @click="editPost(post)" class="primary">Edit</button>
                  <button @click="deletePost(post.id)" class="danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="isEditing" class="modal">
        <div class="modal-content">
          <form @submit.prevent="savePost">
            <label for="postTitle">Title:</label>
            <input type="text" id="postTitle" v-model="currentPost.title" required />
            <label for="postBody">Body:</label>
            <textarea id="postBody" v-model="currentPost.body" required></textarea>
            <div class="modal-actions">
              <button type="submit" class="primary">Save</button>
              <button @click="cancelEdit" class="danger">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUserId: null,
      userPosts: [],
      loading: false,
      isEditing: false,
      currentPost: { id: null, title: '', body: '' }
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    loadUserPosts() {
      if (!this.selectedUserId) return;
      this.loading = true;
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
        .then(response => response.json())
        .then(data => {
          this.userPosts = data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching user posts:', error);
          this.loading = false;
        });
    },
    editPost(post) {
      this.currentPost = { ...post }; // Clone the post object
      this.isEditing = true;
    },
    deletePost(postId) {
      this.userPosts = this.userPosts.filter(post => post.id !== postId);
    },
    savePost() {
      // Find the post index and update the post details
      const postIndex = this.userPosts.findIndex(post => post.id === this.currentPost.id);
      if (postIndex !== -1) {
        this.userPosts[postIndex] = { ...this.currentPost };
      }
      this.isEditing = false;
      this.currentPost = { id: null, title: '', body: '' };
    },
    cancelEdit() {
      this.isEditing = false;
      this.currentPost = { id: null, title: '', body: '' };
    }
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #01012b; /* Dark Navy */
}

.profile {
  max-width: 1000px;
  width: 100%;
  background-color: #01012b; /* Dark Navy */
  border: 1px solid #05d9e8; /* Bright Cyan */
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  margin-bottom: 30px;
}

.profile h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: -5px;
  color: #cfff04; /* Bright Yellow */
}

.user-selection {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-selection select {
  padding: 10px;
  border: 1px solid #05d9e8; /* Bright Cyan */
  border-radius: 5px;
  background-color: #01012b; /* Dark Navy */
  color: #05d9e8; /* Bright Cyan */
  margin: 0 auto;
  margin-bottom: 10px;
}

.loading {
  color: #ff2a6d; /* Pink */
  text-align: center;
  font-size: 1.5rem;
}

.post-table {
  width: 100%;
  border-collapse: collapse;
}

.post-table th,
.post-table td {
  padding: 15px;
  border: 1px solid #05d9e8; /* Bright Cyan */
  text-align: center;
  color: #d1f7ff; /* Light Blue */
}

.post-table td {
  height: 95px;
}

.post-table th {
  background-color: #01012b; /* Dark Navy */
  color: #cfff04; /* Bright Cyan */
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  margin-top: 10px;
  height: 40px;
}

.primary {
  background-color: #05d9e8; /* Bright Cyan */
  color: #01012b; /* Dark Navy */
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.primary:hover {
  background-color: #03a5b6; /* Darker Cyan */
}

.danger {
  background-color: #ff2a6d; /* Pink */
  color: #01012b; /* Dark Navy */
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.danger:hover {
  background-color: #e0205e; /* Darker Pink */
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #01012b; /* Dark Navy */
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #05d9e8; /* Bright Cyan */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 100%;
}

.modal-content h2 {
  margin-bottom: 20px;
  color: #05d9e8; /* Bright Cyan */
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content label {
  color: #d1f7ff; /* Light Blue */
  margin-bottom: 5px;
}

.modal-content input[type="text"],
.modal-content textarea {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #05d9e8; /* Bright Cyan */
  border-radius: 5px;
  background-color: #01012b; /* Dark Navy */
  color: #05d9e8; /* Bright Cyan */
}

.modal-content textarea {
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>

