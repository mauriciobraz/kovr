import { CommandInteraction, Permissions, PermissionString } from "discord.js";
import { GuardFunction } from "discordx";

/**
 * Checks if a user can use a command, if not, sends a message warning him about it.
 * @param permissions Permissions to check if the member has it.
 */
export default function AuthorizationGuard(
  ...permissions: PermissionString[]
): GuardFunction<CommandInteraction> {
  return async (interaction, _client, next, _data) => {
    if (!interaction.member || !interaction.guild) return;

    if (interaction.member.permissions instanceof Permissions) {
      if (interaction.member.permissions.has(permissions)) await next();
    } else {
      !interaction.deferred &&
        (await interaction.deferReply({
          ephemeral: true,
        }));

      await interaction.editReply(
        "Permissões insuficientes para executar este comando."
      );
    }
  };
}
