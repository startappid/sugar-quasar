// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  buttons: {
    send: 'Send'
  },
  auth: {
    network_error: 'Network error. Please check your internet connection',
    submit: 'Submit',
    home: 'Home',
    navigation: 'Navigation',
    my_account: 'My account',
    administrator: {
      title: 'Administrator'
    },
    superuser: {
      title: 'Superuser',
      users: {
        users: 'Users'
      }
    },
    labels: {
      email: 'Email address',
      username: 'Username',
      name: 'Name',
      password: 'Password',
      remember_me: 'Remember me',
      repeat_password: 'Repeat password'
    },
    errors: {
      password_length:
        'The minimum length of the password is {length} characters.',
      password_match: 'Passwords do not match.',
      email: 'A valid email address is required'
    },
    login: {
      login: 'Login',
      password_forgot: 'Forgot your password?',
      verification_required:
        'Please check your email and verify your account first.',
      invalid_credentials: 'Email address or password is incorrect.',
      email: '@:auth.labels.email',
      username: '@:auth.labels.username',
      password: '@:auth.labels.password',
      remember_me: '@:auth.labels.remember_me'
    },
    register: {
      register: 'Register',
      invalid_data:
        'Server could not process the request. Please correct the sent data.',
      already_registered:
        'Email address is already registered. Please check your email for verification.',
      account_created:
        'Please check your email to verify your registration. This sometimes can take up to 10 minutes. Please check the spam folder if the email has not been received.',
      email: '@:auth.labels.email',
      name: '@:auth.labels.name',
      password: '@:auth.labels.password',
      repeat_password: '@:auth.labels.repeat_password',
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match',
        email: '@:auth.errors.email'
      },
      check_email:
        'You want to register with the email address {email}, is this correct?'
    },
    verification: {
      verification_success: 'Your e-mail has been verified. You can now login.',
      verification_failed: 'Verification has failed.'
    },
    logout: {
      logout_confirmation: 'Are you sure you want to log out?',
      confirm: 'Confirm',
      logout: 'Logout',
      cancel: 'Cancel'
    },
    password: {
      forgot: {
        header: 'Request a new password',
        check_email: 'Please check your email to reset your password.',
        email: '@:auth.labels.email'
      },
      reset: {
        header: 'Reset your password',
        success:
          'Your password has been reset. You can now login with the new password.'
      },
      errors: {
        password_length: '@:auth.errors.password_length',
        password_match: '@:auth.errors.password_match'
      }
    },
    users: {
      labels: {
        email: 'Email',
        name: 'Name'
      },
      edit_label: 'Edit',
      verify_label: 'Verify',
      verify_message: 'Are you sure you want to verify {user}?'
    }
  },
  countries: {
    index: {
      title: 'Countries'
    },
    create: {
      title: 'Create new Country'
    },
    show: {
      title: 'Detail Country'
    },
    edit: {
      title: 'Update Country'
    },
    trash: {
      title: 'Trash of Countries'
    },
    trashed: {
      title: null
    },
  },
  provinces: {
    index: {
      title: 'Provinces'
    },
    create: {
      title: 'Create new Province'
    },
    show: {
      title: 'Detail Province'
    },
    edit: {
      title: 'Update Province'
    },
    trash: {
      title: 'Trash of Provinces'
    },
    trashed: {
      title: null
    },
  },
  cities: {
    index: {
      title: 'Cities'
    },
    create: {
      title: 'Create new City'
    },
    show: {
      title: 'Detail City'
    },
    edit: {
      title: 'Update City'
    },
    trash: {
      title: 'Trash of Cities'
    },
    trashed: {
      title: null
    },
  },
  institutions: {
    index: {
      title: 'Institutions'
    },
    create: {
      title: 'Create new Institution'
    },
    show: {
      title: 'Detail Institution'
    },
    edit: {
      title: 'Update Institution'
    },
    trash: {
      title: 'Trash of Institutions'
    },
    trashed: {
      title: null
    },
  },
  institutionMajors: {
    index: {
      title: 'Majors'
    },
    create: {
      title: 'Create new Major'
    },
    show: {
      title: 'Detail Major'
    },
    edit: {
      title: 'Update Major'
    },
    trash: {
      title: 'Trash of Majors'
    },
    trashed: {
      title: null
    },
  },
  institutionDegrees: {
    index: {
      title: 'Degrees'
    },
    create: {
      title: 'Create new Degree'
    },
    show: {
      title: 'Detail Degree'
    },
    edit: {
      title: 'Update Degree'
    },
    trash: {
      title: 'Trash of Degrees'
    },
    trashed: {
      title: null
    },
  },
  institutionGalleries: {
    index: {
      title: 'Galleries'
    },
    create: {
      title: 'Upload new Media'
    },
    show: {
      title: 'Detail Media'
    },
    edit: {
      title: 'Update Media'
    },
    trash: {
      title: 'Trash of Galleries'
    },
    trashed: {
      title: 'Trashed Media'
    },
  },
  courseGalleries: {
    index: {
      title: 'Galleries'
    },
    create: {
      title: 'Upload new Media'
    },
    show: {
      title: 'Detail Media'
    },
    edit: {
      title: 'Update Media'
    },
    trash: {
      title: 'Trash of Galleries'
    },
    trashed: {
      title: 'Trashed Media'
    },
  },
  institutionCalendars: {
    index: {
      title: 'Calendars'
    },
    create: {
      title: 'Create new Calendar'
    },
    show: {
      title: 'Detail Calendar'
    },
    edit: {
      title: 'Update Calendar'
    },
    trash: {
      title: 'Trash of Calendars'
    },
    trashed: {
      title: null
    },
  },
  majors: {
    index: {
      title: 'Majors'
    },
    create: {
      title: 'Create new Major'
    },
    show: {
      title: 'Detail Major'
    },
    edit: {
      title: 'Update Major'
    },
    trash: {
      title: 'Trash of Majors'
    },
    trashed: {
      title: null
    },
  },
  educationalLevels: {
    index: {
      title: 'Educational Levels'
    },
    create: {
      title: 'Create new Educational Level'
    },
    show: {
      title: 'Detail Educational Level'
    },
    edit: {
      title: 'Update Educational Level'
    },
    trash: {
      title: 'Trash of Educational Levels'
    },
    trashed: {
      title: null
    },
  },
  courses: {
    index: {
      title: 'Short Courses'
    },
    create: {
      title: 'Create new Short Course'
    },
    show: {
      title: 'Detail Short Course'
    },
    edit: {
      title: 'Update Short Course'
    },
    trash: {
      title: 'Trash of Short Courses'
    },
    trashed: {
      title: null
    },
  },
  courseCategories: {
    index: {
      title: 'Categories of Course'
    },
    create: {
      title: 'Create new Category'
    },
    show: {
      title: 'Detail Category'
    },
    edit: {
      title: 'Update Category'
    },
    trash: {
      title: 'Trash of Categories of Course'
    },
    trashed: {
      title: null
    },
  },
  enrollments: {
    index: {
      title: 'Enrollments'
    },
    create: {
      title: 'Create new Enrollment'
    },
    show: {
      title: 'Detail Enrollment'
    },
    edit: {
      title: 'Update Enrollment'
    },
    trash: {
      title: 'Trash of Enrollments'
    },
    trashed: {
      title: null
    },
  },
  commissions: {
    index: {
      title: 'Commissions'
    },
    create: {
      title: 'Create new Commission'
    },
    show: {
      title: 'Detail Commission'
    },
    edit: {
      title: 'Update Commission'
    },
    trash: {
      title: 'Trash of Commissions'
    },
    trashed: {
      title: null
    },
  },
  banners: {
    index: {
      title: 'Banners'
    },
    create: {
      title: 'Create new Banner'
    },
    show: {
      title: 'Detail Banner'
    },
    edit: {
      title: 'Update Banner'
    },
    trash: {
      title: 'Trash of Banners'
    },
    trashed: {
      title: null
    },
  },
  applies: {
    index: {
      title: 'How to Apply'
    },
    create: {
      title: 'Create new How to Apply'
    },
    show: {
      title: 'Detail How to Apply'
    },
    edit: {
      title: 'Update How to Apply'
    },
    trash: {
      title: 'Trash of How to Apply'
    },
    trashed: {
      title: null
    },
  },
  faq: {
    index: {
      title: 'F.A.Q'
    },
    create: {
      title: 'Create new F.A.Q'
    },
    show: {
      title: 'Detail F.A.Q'
    },
    edit: {
      title: 'Update F.A.Q'
    },
    trash: {
      title: 'Trash of F.A.Q'
    },
    trashed: {
      title: null
    },
  },
  works: {
    index: {
      title: 'How Does it Works'
    },
    create: {
      title: 'Create new How Does it Works'
    },
    show: {
      title: 'Detail How Does it Works'
    },
    edit: {
      title: 'Update How Does it Works'
    },
    trash: {
      title: 'Trash of How Does it Works'
    },
    trashed: {
      title: null
    },
  },
  partnerships: {
    index: {
      title: 'Partnerships'
    },
    create: {
      title: 'Create new Partnerships'
    },
    show: {
      title: 'Detail Partnerships'
    },
    edit: {
      title: 'Update Partnerships'
    },
    trash: {
      title: 'Trash of Partnerships'
    },
    trashed: {
      title: null
    },
  },
  terms: {
    index: {
      title: 'Terms & Conditions'
    },
    create: {
      title: 'Create new Terms & Conditions'
    },
    show: {
      title: 'Detail Terms & Conditions'
    },
    edit: {
      title: 'Update Terms & Conditions'
    },
    trash: {
      title: 'Trash of Terms & Conditions'
    },
    trashed: {
      title: null
    },
  },
  memberships: {
    index: {
      title: 'Memberships'
    },
    create: {
      title: 'Create new Memberships'
    },
    show: {
      title: 'Detail Memberships'
    },
    edit: {
      title: 'Update Memberships'
    },
    trash: {
      title: 'Trash of Memberships'
    },
    trashed: {
      title: null
    },
  },
  documents: {
    index: {
      title: 'Documents'
    },
    create: {
      title: 'Upload Document'
    },
    show: {
      title: 'Detail Document'
    },
    edit: {
      title: 'Update Document'
    },
    trash: {
      title: 'Trash of Documents'
    },
    trashed: {
      title: null
    },
  },
  resumes: {
    index: {
      title: 'Digital Resumes'
    },
    create: {
      title: 'Create new Digital Resumes'
    },
    show: {
      title: 'Detail Digital Resumes'
    },
    edit: {
      title: 'Update Digital Resumes'
    },
    trash: {
      title: 'Trash of Digital Resumes'
    },
    trashed: {
      title: null
    },
  },
  users: {
    index: {
      title: 'Users'
    },
    create: {
      title: 'Create new User'
    },
    show: {
      title: 'Detail User'
    },
    edit: {
      title: 'Update User'
    },
    trash: {
      title: 'Trash of Users'
    },
    trashed: {
      title: null
    },
  },
  agents: {
    index: {
      title: 'Digital Partners'
    },
    create: {
      title: 'Create new Digital Partner'
    },
    show: {
      title: 'Detail Digital Partner'
    },
    edit: {
      title: 'Update Digital Partner'
    },
    trash: {
      title: 'Trash of Digital Partners'
    },
    trashed: {
      title: null
    },
  },
  reportAgents: {
    index: {
      title: 'Report Digital Partners'
    },
    create: {
      title: 'Report Digital Partners'
    },
    show: {
      title: 'Report Digital Partners'
    },
    edit: {
      title: 'Report Digital Partners'
    },
    trash: {
      title: 'Report Digital Partners'
    },
    trashed: {
      title: 'Report Digital Partners'
    },
  },
  reportCommissions: {
    index: {
      title: 'Report Commissions'
    },
    create: {
      title: 'Report Commissions'
    },
    show: {
      title: 'Report Commissions'
    },
    edit: {
      title: 'Report Commissions'
    },
    trash: {
      title: 'Report Commissions'
    },
    trashed: {
      title: 'Report Commissions'
    },
  },
  students: {
    index: {
      title: 'Students'
    },
    create: {
      title: 'Create new Students'
    },
    show: {
      title: 'Detail Students'
    },
    edit: {
      title: 'Update Students'
    },
    trash: {
      title: 'Trash of Students'
    },
    trashed: {
      title: null
    },
  },
  reportStudents: {
    index: {
      title: 'Report Students'
    },
    create: {
      title: 'Report Students'
    },
    show: {
      title: 'Report Students'
    },
    edit: {
      title: 'Report Students'
    },
    trash: {
      title: 'Report Students'
    },
    trashed: {
      title: 'Report Students'
    },
  },
  addresses: {
    index: {
      title: 'Addresses'
    },
    create: {
      title: 'Create new Address'
    },
    show: {
      title: 'Detail Address'
    },
    edit: {
      title: 'Update Address'
    },
    trash: {
      title: 'Trash of Addresses'
    },
    trashed: {
      title: null
    },
  },
  contacts: {
    index: {
      title: 'Contacts'
    },
    create: {
      title: 'Create new Contact'
    },
    show: {
      title: 'Detail Contact'
    },
    edit: {
      title: 'Update Contact'
    },
    trash: {
      title: 'Trash of Contacts'
    },
    trashed: {
      title: null
    },
  },
  files: {
    index: {
      title: 'Files & Media'
    },
    create: {
      title: 'Upload Media'
    },
    show: {
      title: 'Detail Media'
    },
    edit: {
      title: 'Update Media'
    },
    trash: {
      title: 'Trash of Files & Media'
    },
    trashed: {
      title: null
    },
  },
  permissions: {
    index: {
      title: 'Permissions'
    },
    create: {
      title: 'Create new Permission'
    },
    show: {
      title: 'Detail Permission'
    },
    edit: {
      title: 'Update Permission'
    },
    trash: {
      title: 'Trash of Permissions'
    },
    trashed: {
      title: null
    },
  },
  roles: {
    index: {
      title: 'Roles'
    },
    create: {
      title: 'Create new Role'
    },
    show: {
      title: 'Detail Role'
    },
    edit: {
      title: 'Update Role'
    },
    trash: {
      title: 'Trash of Roles'
    },
    trashed: {
      title: null
    },
  },
  sysparam: {
    index: {
      title: 'System Parameters'
    },
    create: {
      title: 'Create new System Parameter'
    },
    show: {
      title: 'System Parameter'
    },
    edit: {
      title: 'Update Parameter'
    },
    trash: {
      title: 'Trash of System Parameters'
    },
    trashed: {
      title: null
    },
  },
  notifications: {
    index: {
      title: 'Notifications'
    },
    create: {
      title: 'Create new Notifications'
    },
    show: {
      title: 'Detail Notification'
    },
    edit: {
      title: 'Update Notification'
    },
    trash: {
      title: 'Trash of Notifications'
    },
    trashed: {
      title: null
    },
  },
  notificationTemplates: {
    index: {
      title: 'Notification Templates'
    },
    create: {
      title: 'Create new Notification Templates'
    },
    show: {
      title: 'Notification Template'
    },
    edit: {
      title: 'Update Notification Template'
    },
    trash: {
      title: 'Trash of Notification Templates'
    },
    trashed: {
      title: null
    },
  },
  notificationFormats: {
    index: {
      title: 'Notification Formats'
    },
    create: {
      title: 'Create new Notification Formats'
    },
    show: {
      title: 'Notification Format'
    },
    edit: {
      title: 'Update Notification Format'
    },
    trash: {
      title: 'Trash of Notification Formats'
    },
    trashed: {
      title: null
    },
  },
  notificationsBroadcast: {
    index: {
      title: 'Notification Formats'
    },
    create: {
      title: 'Broadcast'
    },
    show: {
      title: 'Notification Format'
    },
    edit: {
      title: 'Update Notification Format'
    },
    trash: {
      title: 'Trash of Notification Formats'
    },
    trashed: {
      title: null
    },
  },
  bankAccounts: {
    index: {
      title: 'Bank Accounts'
    },
    create: {
      title: 'Bank Account'
    },
    show: {
      title: 'Bank Account'
    },
    edit: {
      title: 'Update Bank Account'
    },
    trash: {
      title: 'Trash of Bank Accounts'
    },
    trashed: {
      title: null
    },
  },
  tuitions: {
    index: {
      title: 'Tuitions'
    },
    create: {
      title: 'Tuition'
    },
    show: {
      title: 'Tuition'
    },
    edit: {
      title: 'Update Tuition'
    },
    trash: {
      title: 'Trash of Tuitions'
    },
    trashed: {
      title: null
    },
  },
}
