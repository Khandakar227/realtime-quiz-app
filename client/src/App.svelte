<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/pages/Login.svelte";
  import AuthGuard from "./lib/components/AuthGuard.svelte";
  import Navbar from "./lib/components/Navbar.svelte";
  import Register from "./lib/pages/Register.svelte";
  import { onDestroy, onMount } from "svelte";
  import { onAuthStateChanged, type Unsubscribe } from "firebase/auth";
  import { currentUser, userLoading } from "./lib/stores/user";
  import { auth } from "./lib/firebase/config";
  import { BootstrapToast, ToastContainer } from "svelte-toasts";
  import Profile from "./lib/pages/Profile.svelte";
  import Quiz from "./lib/pages/Quiz.svelte";
  import { EV_NAMES, QUIZ_STATUS } from "./lib/configs/socket";
  import { quizStatus, socket } from "./lib/stores/socket";
  import AdminPanel from "./lib/pages/AdminPanel.svelte";

  export let url = "";

  let unsubscribe: Unsubscribe;

  onMount(async () => {
    unsubscribe = onAuthStateChanged(auth, async (user) => {
      currentUser.set(user);
      userLoading.set(false);
    });

    $socket.on(EV_NAMES.CONNECTION, () => {
      console.log("Connected");
    });

    $socket.on(EV_NAMES.BROADCAST, (data) => {
      quizStatus.set(data.status);
      console.log(data);
    });

    $socket.on("disconnect", () => {
      quizStatus.set(QUIZ_STATUS.LOADING);
      console.log("Disconnected");
    });

  });

  $: {
    if ($currentUser && $quizStatus == QUIZ_STATUS.STARTED) {
      console.log($quizStatus);
      $currentUser
        .getIdToken()
        .then((token) => $socket.emit(EV_NAMES.QUIZ, { token }))
        .catch((err) => console.log(err));
    } else $socket.emit(EV_NAMES.QUIZ, { token: "" });
  }

  onDestroy(() => {
    unsubscribe();
  });
</script>

<Router {url}>
  <Navbar />
  <Route path="/"><Home /></Route>
  <Route path="/login">
    <AuthGuard loading={$userLoading} access={!$currentUser}>
      <Login />
    </AuthGuard>
  </Route>
  <Route path="/register">
    <AuthGuard loading={$userLoading} access={!$currentUser}>
      <Register />
    </AuthGuard>
  </Route>
  <Route path="/profile">
    <AuthGuard loading={$userLoading} access={!!$currentUser} to="/login" toastErrorMsg="Please login first"
    >
      <Profile />
    </AuthGuard>
  </Route>
  <Route path="/quiz">
    <AuthGuard loading={$userLoading} access={!!$currentUser} to="/login" toastErrorMsg="Please login first" >
      <Quiz />
    </AuthGuard>
  </Route>
  <Route path="/admin">
    <AuthGuard loading={$userLoading} access={!!$currentUser} to="/login">
      <AdminPanel />
    </AuthGuard>
  </Route>
</Router>
<ToastContainer let:data placement="top-right">
  <BootstrapToast {data} />
</ToastContainer>
