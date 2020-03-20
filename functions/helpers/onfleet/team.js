const Onfleet = require("@onfleet/node-onfleet");
const onfleet = new Onfleet(process.env.ONFLEET_KEY);

createTeam = async (address, person) => {
  console.log(address);
  console.log(person);

  return await onfleet.tasks.create({
    destination: { address: address },
    recipients: [person],
    notes: notes,
    autoAssign: { mode: "distance" }
  });
};

module.exports = {
  createTeam
};
