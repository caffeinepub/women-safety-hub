import Map "mo:core/Map";
import Int "mo:core/Int";
import Text "mo:core/Text";

module {
  // Legacy types (missing fields)
  type OldFeedback = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type OldHelpline = {
    name : Text;
    number : Text;
  };

  type OldLaw = {
    title : Text;
    description : Text;
  };

  // Legacy actor
  type OldActor = {
    feedbackData : Map.Map<Int, OldFeedback>;
    helplineData : Map.Map<Text, OldHelpline>;
    lawData : Map.Map<Text, OldLaw>;
  };

  func defaultCategory(_ : OldHelpline) : Text {
    "general";
  };

  func defaultDescription(_ : OldLaw) : Text {
    "general";
  };

  func convertOldHelpline(helpline : OldHelpline) : { name : Text; number : Text; category : Text } {
    { helpline with category = "general" };
  };

  func convertOldLaw(law : OldLaw) : { title : Text; description : Text; category : Text } {
    { law with category = "general" };
  };

  // New actor = OldActor (use default values for persistent legacy data)
  type NewActor = {
    feedbackData : Map.Map<Int, OldFeedback>;
    helplineData : Map.Map<Text, { name : Text; number : Text; category : Text }>;
    lawData : Map.Map<Text, { title : Text; description : Text; category : Text }>;
  };

  // Data migration function (called on upgrades)
  public func run(old : OldActor) : NewActor {
    {
      old with
      helplineData = old.helplineData.map<Text, OldHelpline, { name : Text; number : Text; category : Text }>(
        func(_name, helpline) { convertOldHelpline(helpline) }
      );
      lawData = old.lawData.map<Text, OldLaw, { title : Text; description : Text; category : Text }>(
        func(_title, law) { convertOldLaw(law) }
      );
    };
  };
};
