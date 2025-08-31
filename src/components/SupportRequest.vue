<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const userStore = useUserStore();
const { user } = userStore;

// Form fields
const fullName = ref('');
const email = ref('');
const category = ref('');
const subject = ref('');
const description = ref('');
const priority = ref('');
const error = ref('');
const success = ref('');
const loading = ref(false);

const categories = [
  'Account Access',
  'Deposit/Withdrawal',
  'Order Execution',
  'Technical Issue',
  'Market Data',
  'General Inquiry'
];

const priorities = ['Low', 'Medium', 'High', 'Critical'];

const handleSubmit = async () => {
  error.value = '';
  success.value = '';
  if (!fullName.value || !email.value || !category.value || !subject.value || !description.value || !priority.value) {
    error.value = 'All fields are required.';
    return;
  }

  loading.value = true;
  try {
    await addDoc(collection(db, 'supportRequests'), {
      fullName: fullName.value,
      email: email.value,
      category: category.value,
      subject: subject.value,
      description: description.value,
      priority: priority.value,
      userId: user?.uid || null,
      timestamp: serverTimestamp(),
    });
    success.value = 'Your support request has been submitted successfully!';
    fullName.value = '';
    email.value = '';
    category.value = '';
    subject.value = '';
    description.value = '';
    priority.value = '';
  } catch (e) {
    error.value = 'Failed to submit your request. Please try again later.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-8 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
    <div class="text-center mb-6">
      <img src="/assets/img/logo/logo-s.png" alt="Logo" class="mx-auto w-24">
    </div>
    <h2 class="text-3xl font-extrabold text-primary mb-6">Support Request</h2>

    <div v-if="error" class="text-red-500 mb-4 bg-red-100 p-3 rounded-lg">{{ error }}</div>
    <div v-if="success" class="text-green-600 mb-4 bg-green-100 p-3 rounded-lg">{{ success }}</div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="fullName" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
        <input
          id="fullName"
          v-model="fullName"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter your email address"
          required
        />
      </div>

      <div>
        <label for="category" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Request Category</label>
        <select
          id="category"
          v-model="category"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
          required
        >
          <option value="" disabled>Select a category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div>
        <label for="subject" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
        <input
          id="subject"
          v-model="subject"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter the subject"
          required
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
        <textarea
          id="description"
          v-model="description"
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
          placeholder="Describe your issue in detail"
          required
        ></textarea>
      </div>

      <div>
        <label for="priority" class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Priority</label>
        <select
          id="priority"
          v-model="priority"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-gray-300"
          required
        >
          <option value="" disabled>Select priority</option>
          <option v-for="prio in priorities" :key="prio" :value="prio">{{ prio }}</option>
        </select>
      </div>

      <div class="text-center">
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          {{ loading ? 'Submitting...' : 'Send Request' }}
        </button>
      </div>
    </form>

    <div class="text-center mt-6">
      <router-link to="/" class="text-primary font-semibold hover:underline">Return to Home</router-link>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>