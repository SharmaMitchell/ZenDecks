import React, { useContext } from "react";
import styles from "./UserAuth.module.scss";
import Button from "../Button/Button";
import {
  auth,
  firestore,
  googleAuthProvider,
} from "../../components/utils/firebase";
import { UserContext } from "../utils/context";

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
}: {
  username: string;
  isValid: boolean;
}) => {
  if (username.length > 0 && username.length < 3) {
    return (
      <p className={styles.usernameform__hint}>
        Your username must be at least 3 characters long.
      </p>
    );
  } else if (username.length >= 3 && !isValid) {
    return (
      <p className={styles.usernameform__hint}>
        Your username can only contain letters, numbers and underscores.
      </p>
    );
  } else if (username.length >= 3 && isValid) {
    return (
      <p className={styles.usernameform__hint}>Your username is available!</p>
    );
  } else {
    return <p className={styles.usernameform__hint}></p>;
  }
};

const UsernameForm = () => {
  const [formValue, setFormValue] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const re = /^[a-zA-Z0-9_]+$/;
    if (val.length < 3) {
      setFormValue(val);
      setIsValid(false);
    }
    if (val.length >= 3 && re.test(val)) {
      setFormValue(val);
      setIsValid(true);
    }
    if (val.length >= 3 && !re.test(val)) {
      setFormValue(val);
      setIsValid(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const ref = firestore.doc(`usernames/${formValue}`);
      await ref.set({ uid: auth.currentUser?.uid });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return !loading ? (
    <form onSubmit={onSubmit} className={styles.usernameform}>
      <h3 className={styles.usernameform__title}>Choose Username</h3>
      <input
        name="username"
        placeholder="Username"
        value={formValue}
        onChange={onChange}
        className={styles.usernameform__input}
      />
      <UsernameMessage username={formValue} isValid={isValid} />
      <Button type="submit" disabled={!isValid} label="Choose" />
    </form>
  ) : (
    <p>Loading...</p>
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
          <Button onClick={() => auth.signOut()} label="Sign Out" />
        )
      ) : (
        <Button onClick={signInWithGoogle} label="Sign in with Google" />
      )}
    </div>
  );
};

export default UserAuth;
