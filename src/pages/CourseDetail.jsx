import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { fetchCourse } from "../lib/courses";
import { enrollInCourse } from "../lib/courses";
import { useAuth } from "../context/AuthContext";

const videoEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
};

function RegisterForm({ signUp, signIn, onAuthenticated, isConfigured }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!isConfigured) {
      setError(
        "Registration is temporarily unavailable. Please try again later.",
      );
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const credential =
        mode === "signup"
          ? await signUp(email, password, displayName)
          : await signIn(email, password);
      await onAuthenticated(credential.user);
    } catch (nextError) {
      const messages = {
        "auth/email-already-in-use":
          "An account already exists for this email. Sign in instead.",
        "auth/invalid-credential": "The email or password is incorrect.",
        "auth/weak-password":
          "Use a stronger password with at least 6 characters.",
        "auth/invalid-email": "Enter a valid email address.",
      };
      setError(
        messages[nextError.code] ||
          nextError.message ||
          "Authentication failed.",
      );
    }
  };
  return (
    <form onSubmit={submit} className="space-y-2">
      {mode === "signup" && (
        <input
          className="field"
          type="text"
          required
          placeholder="Your name"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
        />
      )}
      <input
        className="field"
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className="field"
        type="password"
        required
        minLength="6"
        placeholder="Password (6+ characters)"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {mode === "signup" && (
        <input
          className="field"
          type="password"
          required
          minLength="6"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
        type="submit"
      >
        {mode === "signup" ? "Create learner account" : "Sign in"}
      </button>
      <button
        type="button"
        className="w-full text-xs text-blue-600"
        onClick={() =>
          setMode((current) => (current === "signup" ? "signin" : "signup"))
        }
      >
        {mode === "signup"
          ? "Already registered? Sign in"
          : "Need an account? Register"}
      </button>
    </form>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [notice, setNotice] = useState("");
  const { user, signIn, signUp, isConfigured } = useAuth();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    fetchCourse(slug)
      .then(setCourse)
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const register = async (authenticatedUser = user) => {
    setNotice("");
    if (!authenticatedUser) {
      setNotice("Create a learner account or sign in below to register.");
      return;
    }
    setRegistering(true);
    try {
      await enrollInCourse(authenticatedUser.uid, course);
      setNotice("You are registered for this course.");
    } catch (error) {
      setNotice(error.message || "Registration failed.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-16 text-center">Loading course...</Container>
    );
  }
  if (!course) {
    return (
      <Container className="py-16 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Course not found.
        </p>
        <Link
          to="/courses"
          className="mt-6 inline-block rounded-full bg-blue-500 px-5 py-3 font-semibold text-white"
        >
          Back to courses
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Seo
        title={course.title}
        description={course.description}
        path={`/courses/${course.slug}`}
      />
      <Container className="py-16 md:py-24">
        <div className="mb-8">
          <Link
            to="/courses"
            className="text-sm font-semibold text-blue-500 hover:text-blue-400"
          >
            ← Back to courses
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                {course.category}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                {course.title}
              </h1>
            </div>
            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
              {course.price === 0 ? "Free" : `$${course.price}`} ·{" "}
              {course.duration}
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            {course.description}
          </p>
          {(course.trialVideoUrl || course.trialText) && (
            <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-500/30 dark:bg-blue-500/10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
                Free preview
              </p>
              <h2 className="mt-2 text-2xl font-bold">Try the first lesson</h2>
              {course.trialVideoUrl && (
                <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-slate-950">
                  <iframe
                    className="h-full w-full"
                    src={videoEmbedUrl(course.trialVideoUrl)}
                    title={`${course.title} trial lesson`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {course.trialText && (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {course.trialText}
                </p>
              )}
            </section>
          )}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                What you will learn
              </h2>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                {course.lessons.map((lesson) => (
                  <li key={lesson} className="flex gap-3">
                    <span className="mt-1 text-blue-500">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/80">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Course info
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Level</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format</span>
                  <span>Self-paced</span>
                </div>
                <div className="flex justify-between">
                  <span>Access</span>
                  <span>
                    {course.price === 0 ? "Included" : "Enrollment required"}
                  </span>
                </div>
              </div>
              <button
                onClick={register}
                disabled={registering}
                className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400"
              >
                {registering
                  ? "Registering..."
                  : user
                    ? "Register for this course"
                    : "Sign in to register"}
              </button>
              {notice && (
                <p className="mt-3 text-center text-sm text-blue-700 dark:text-blue-300">
                  {notice}
                </p>
              )}
              {!user && (
                <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                  <p className="text-xs text-slate-500">
                    Register with your own learner account below. Your account
                    will be enrolled in this course after successful
                    registration.
                  </p>
                  <RegisterForm
                    signUp={signUp}
                    signIn={signIn}
                    onAuthenticated={register}
                    isConfigured={isConfigured}
                  />
                </div>
              )}
              {course.youtubeUrl && (
                <a
                  href={course.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block text-center text-sm font-semibold text-red-600 hover:text-red-500"
                >
                  Watch this course on YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
/*
import { useEffect, useState } from "react";
import { Container } from "../components/layout/Container";
import Seo from "../components/seo/Seo";
import { fetchCourse } from "../lib/courses";
import { enrollInCourse } from "../lib/courses";
import { useAuth } from "../context/AuthContext";

const videoEmbedUrl = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
};

function RegisterForm({ signUp, signIn, onAuthenticated, isConfigured }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!isConfigured) {
      setError("Registration is temporarily unavailable. Please try again later.");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const credential = mode === "signup"
        ? await signUp(email, password, displayName)
        : await signIn(email, password);
      await onAuthenticated(credential.user);
    } catch (nextError) {
      const messages = {
        "auth/email-already-in-use": "An account already exists for this email. Sign in instead.",
        "auth/invalid-credential": "The email or password is incorrect.",
        "auth/weak-password": "Use a stronger password with at least 6 characters.",
        "auth/invalid-email": "Enter a valid email address.",
      };
      setError(messages[nextError.code] || nextError.message || "Authentication failed.");
    }
  };
  return (
    <form onSubmit={submit} className="space-y-2">
      {mode === "signup" && (
        <input className="field" type="text" required placeholder="Your name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
      )}
      <input className="field" type="email" required placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
      <input className="field" type="password" required minLength="6" placeholder="Password (6+ characters)" value={password} onChange={(event) => setPassword(event.target.value)} />
      {mode === "signup" && (
        <input className="field" type="password" required minLength="6" placeholder="Confirm password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white" type="submit">
        {mode === "signup" ? "Create learner account" : "Sign in"}
      </button>
      <button type="button" className="w-full text-xs text-blue-600" onClick={() => setMode((current) => current === "signup" ? "signin" : "signup")}>
        {mode === "signup" ? "Already registered? Sign in" : "Need an account? Register"}
      </button>
    </form>
  );
}

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [notice, setNotice] = useState("");
  const { user, signIn, signUp, isConfigured } = useAuth();
  useEffect(() => {
    fetchCourse(slug)
      .then(setCourse)
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const register = async (authenticatedUser = user) => {
    setNotice("");
    if (!authenticatedUser) {
      setNotice("Create a learner account or sign in below to register.");
      return;
    }
    setRegistering(true);
    try {
      await enrollInCourse(authenticatedUser.uid, course);
      setNotice("You are registered for this course.");
    } catch (error) {
      setNotice(error.message || "Registration failed.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return <Container className="py-16 text-center">Loading course...</Container>;
  }
  if (!course) {
    return (
      <Container className="py-16 text-center">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Course not found.
        </p>
        <Link
          to="/courses"
          className="mt-6 inline-block rounded-full bg-blue-500 px-5 py-3 font-semibold text-white"
        >
          Back to courses
        </Link>
      </Container>
    );
  }

    return (
    <>
      <Seo
        title={course.title}
        description={course.description}
        path={`/courses/${course.slug}`}
      />
      <Container className="py-16 md:py-24">
        <div className="mb-8">
          <Link
            to="/courses"
            className="text-sm font-semibold text-blue-500 hover:text-blue-400"
          >
            ← Back to courses
          </Link>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                {course.category}
              </p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
                {course.title}
              </h1>
            </div>
            <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
              {course.price === 0 ? "Free" : `$${course.price}`} ·{" "}
              {course.duration}
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-300">
            {course.description}
          </p>
          {(course.trialVideoUrl || course.trialText) && (
            <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-500/30 dark:bg-blue-500/10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
                Free preview
              </p>
              <h2 className="mt-2 text-2xl font-bold">Try the first lesson</h2>
              {course.trialVideoUrl && (
                <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-slate-950">
                  <iframe
                    className="h-full w-full"
                    src={videoEmbedUrl(course.trialVideoUrl)}
                    title={`${course.title} trial lesson`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {course.trialText && (
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {course.trialText}
                </p>
              )}
            </section>
          )}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                What you will learn
              </h2>
              <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
                {course.lessons.map((lesson) => (
                  <li key={lesson} className="flex gap-3">
                    <span className="mt-1 text-blue-500">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/80">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Course info
              </p>
              <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex justify-between">
                  <span>Level</span>
                  <span>{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format</span>
                  <span>Self-paced</span>
                </div>
                <div className="flex justify-between">
                  <span>Access</span>
                  <span>
                    {course.price === 0 ? "Included" : "Enrollment required"}
                  </span>
                </div>
              </div>
              <button onClick={register} disabled={registering} className="mt-6 w-full rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60 dark:bg-blue-500 dark:text-slate-950 dark:hover:bg-blue-400">
                {registering ? "Registering..." : user ? "Register for this course" : "Sign in to register"}
              </button>
              {notice && <p className="mt-3 text-center text-sm text-blue-700 dark:text-blue-300">{notice}</p>}
              {!user && (
                <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                  <p className="text-xs text-slate-500">Register with your own learner account below. Your account will be enrolled in this course after successful registration.</p>
                  <RegisterForm
                    signUp={signUp}
                    signIn={signIn}
                    onAuthenticated={register}
                    isConfigured={isConfigured}
                  />
                </div>
              )}
              <a
                href={course.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-center text-sm font-semibold text-red-600 hover:text-red-500"
              >
                Watch this course on YouTube
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
  }
  */
