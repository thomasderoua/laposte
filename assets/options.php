<?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    require_once('../assets/functions.php');

    $user = getUserByID($_SESSION['id']);
?>

<header class="profile-header">
    <img src="images/cover.jpg" alt="">
    <h1 class="page-title"><?php echo $_SESSION['name']?></h1>
    <button class="edit-profile js-ajax-page" data-page="profile">
        <img src="images/yes.svg" alt="">
    </button>
</header>

<img class="avatar" src="data:image/png;base64,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" alt="">

<form action="">
    <label class="options-label" for=""><strong class="required">*</strong> Prénom</label>
    <input class="options-input" type="text" placeholder="Prénom" value="<?=$user->name?>">

    <label class="options-label" for=""><strong class="required">*</strong> Nom</label>
    <input class="options-input" type="text" placeholder="Nom" value="<?=$user->lastname?>">
    
    <label class="options-label" for=""><strong class="required">*</strong> Email</label>
    <input class="options-input" type="email" placeholder="Adresse email" value="<?=$user->mail?>">

    <label class="options-label" for=""><strong class="required">*</strong> Mot de passe</label>
    <input class="options-input" type="text" placeholder="Mot de passe" value="">

    <button>Valider</button>
</form>