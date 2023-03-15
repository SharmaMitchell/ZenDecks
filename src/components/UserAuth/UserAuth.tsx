import React, { useCallback, useContext, useEffect } from "react";
import styles from "./UserAuth.module.scss";
import Button from "../Button/Button";
import {
  auth,
  firestore,
  googleAuthProvider,
} from "../../components/utils/firebase";
import { UserContext } from "../utils/context";
import debounce from "lodash.debounce";

const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleAuthProvider);
  } catch (error) {
    console.log(error);
  }
};

const UsernameMessage = ({
  username,
  isValid,
  loading,
}: {
  username: string;
  isValid: boolean;
  loading: boolean;
}) => {
  const re = /^[a-zA-Z0-9_]+$/;
  if (username.length > 0 && username.length < 3) {
    return (
      <p className={styles.usernameform__hint}>
        Your username must be at least 3 characters long.
      </p>
    );
  } else if (username.length >= 3 && !re.test(username)) {
    return (
      <p className={styles.usernameform__hint}>
        Your username can only contain letters, numbers and underscores.
      </p>
    );
  } else if (loading) {
    return (
      <p className={styles.usernameform__hint}>Checking availability...</p>
    );
  } else if (isValid) {
    return (
      <p className={styles.usernameform__hint}>Your username is available!</p>
    );
  } else if (username && !isValid) {
    return <p className={styles.usernameform__hint}>That username is taken!</p>;
  } else {
    return <p className={styles.usernameform__hint}></p>;
  }
};

const UsernameForm = () => {
  const [formValue, setFormValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsValid(false);
    const val = e.target.value;
    const re = /^[a-zA-Z0-9_]+$/;
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    if (val.length >= 3 && re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(true);
    }
    if (val.length >= 3 && !re.test(val)) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userDoc = firestore.doc(`users/${user?.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);

      const batch = firestore.batch();
      batch.set(userDoc, { username: formValue, photoURL: user?.photoURL });
      batch.set(usernameDoc, { uid: user?.uid });
      await batch.commit();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className={styles.usernameform}>
      <h3 className={styles.usernameform__title}>Choose Username</h3>
      <input
        name="username"
        placeholder="Username"
        value={formValue}
        onChange={onChange}
        className={styles.usernameform__input}
      />
      <UsernameMessage
        username={formValue}
        isValid={isValid}
        loading={loading}
      />
      <Button type="submit" disabled={!isValid || loading} label="Choose" />

      <h3>Debug State</h3>
      <div>
        Username: {formValue}
        <br />
        Loading: {loading.toString()}
        <br />
        Username Valid: {isValid.toString()}
      </div>
    </form>
  );
};

const UserAuth = () => {
  const { user, username } = useContext(UserContext);

  return (
    <div>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <div className={styles.logout}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="user avatar"
                className={styles.logout__avatar}
              />
            ) : null}
            <p className={styles.logout__username}>{username}</p>
            <Button onClick={() => auth.signOut()} label="Log Out" />
          </div>
        )
      ) : (
        <div className={styles.login}>
          <Button onClick={signInWithGoogle} label="Sign in with Google" />
        </div>
      )}
    </div>
  );
};

export default UserAuth;
